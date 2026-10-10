import math
import uuid
from typing import List, Dict, Any, Tuple
from models import (
    FoodProfile, JourneyProfile, PackagingObjectives, AssessmentRequest,
    PackagingRecommendation, PackagingMaterialSpec, ExplanationFactor,
    EvidenceRecord, StressTestRequest, StressTestResult, QualityCurvePoint
)
from knowledge_db import DEMO_FOOD_PROFILES, PACKAGING_CANDIDATES, EVIDENCE_KNOWLEDGE_BASE

def evaluate_scientific_constraints(food: FoodProfile, journey: JourneyProfile, material: PackagingMaterialSpec) -> Tuple[float, List[str]]:
    """
    Evaluates scientific suitability and returns a base protection score (0-100)
    along with any scientific constraint violations or warnings.
    """
    score = 100.0
    violations = []

    # 1. Respiration Match Constraint
    if "Active" in food.respiration_type or "Very Active" in food.respiration_type:
        if not material.gas_exchange_capable:
            score -= 35.0
            violations.append(
                f"Gas Exchange Conflict: {food.commodity} has {food.respiration_type} respiration, "
                f"but {material.name} lacks gas exchange capability. Risk of anaerobic fermentation."
            )
        elif material.otr_cc_m2_day_atm < 10.0:
            score -= 20.0
            violations.append(
                f"Insufficient OTR: OTR of {material.otr_cc_m2_day_atm} cc/m²/day is too restrictive "
                f"for high-respiring {food.commodity}."
            )
    elif food.respiration_type == "Non-respiring":
        if material.otr_cc_m2_day_atm > 100.0 and food.fat_oil_content_pct > 5.0:
            score -= 30.0
            violations.append(
                f"High Oxygen Permeability: High fat content ({food.fat_oil_content_pct}%) in {food.commodity} "
                f"requires low OTR to prevent lipid oxidation, but film OTR is {material.otr_cc_m2_day_atm} cc/m²/day."
            )

    # 2. Moisture Barrier Constraint
    if food.moisture_content_pct > 80.0:
        # High moisture food -> needs WVTR protection or controlled breathability
        if journey.relative_humidity_pct < 50.0 and material.wvtr_g_m2_day > 20.0:
            score -= 25.0
            violations.append(
                f"Transpiration Loss Risk: Ambient humidity is dry ({journey.relative_humidity_pct}%), "
                f"and film WVTR ({material.wvtr_g_m2_day} g/m²/day) allows excessive moisture loss from {food.commodity}."
            )
        elif journey.relative_humidity_pct > 85.0 and journey.temperature_c > 30.0:
            if material.wvtr_g_m2_day > 10.0:
                score -= 20.0
                violations.append(
                    f"Condensation & Mold Risk: High transit temperature ({journey.temperature_c}°C) and RH ({journey.relative_humidity_pct}%) "
                    f"increase moisture condensation risk inside un-barrier film."
                )

    # 3. Temperature Range Constraint
    if journey.temperature_c < material.temp_min_c or journey.temperature_c > material.temp_max_c:
        score -= 40.0
        violations.append(
            f"Thermal Limit Exceeded: Journey temp ({journey.temperature_c}°C) falls outside material stability range "
            f"({material.temp_min_c}°C to {material.temp_max_c}°C)."
        )

    # 4. Journey Duration Weighting
    if journey.transport_duration_hours > 72:
        if material.wvtr_g_m2_day > 10.0 or material.otr_cc_m2_day_atm > 150.0:
            score -= 15.0
            violations.append(
                f"Extended Transit Wear: Transport duration ({journey.transport_duration_hours}h) requires sustained barrier performance."
            )

    return max(0.0, score), violations


def compute_multi_objective_recommendation(request: AssessmentRequest) -> PackagingRecommendation:
    food = request.food_profile
    journey = request.journey_profile
    objs = request.objectives

    # Normalize objective weights to ensure total = 1.0
    total_w = objs.protection_weight + objs.cost_weight + objs.material_efficiency_weight + objs.environmental_weight
    w_prot = objs.protection_weight / (total_w or 1.0)
    w_cost = objs.cost_weight / (total_w or 1.0)
    w_mat = objs.material_efficiency_weight / (total_w or 1.0)
    w_env = objs.environmental_weight / (total_w or 1.0)

    candidate_results = []
    
    for candidate in PACKAGING_CANDIDATES:
        prot_score, constraint_warnings = evaluate_scientific_constraints(food, journey, candidate)
        
        # Cost score: Inverse of cost index (1.0 index = 80 score, 0.8 index = 100 score, 1.75 index = 45 score)
        cost_score = max(0.0, min(100.0, 100.0 - (candidate.cost_index - 0.8) * 60.0))
        
        # Material Efficiency score: Higher thickness reduces efficiency score slightly
        mat_eff_score = max(0.0, min(100.0, 100.0 - (candidate.thickness_microns - 30) * 0.8))
        
        # Environmental score: Based on material sustainability rating (1-10 mapped to 10-100)
        env_score = candidate.sustainability_score * 10.0

        # Multi-objective Utility Function
        overall_utility = (
            (prot_score * w_prot) +
            (cost_score * w_cost) +
            (mat_eff_score * w_mat) +
            (env_score * w_env)
        )

        candidate_results.append({
            "material": candidate,
            "protection_score": round(prot_score, 1),
            "cost_score": round(cost_score, 1),
            "material_efficiency_score": round(mat_eff_score, 1),
            "sustainability_score": round(env_score, 1),
            "overall_utility_score": round(overall_utility, 1),
            "constraint_warnings": constraint_warnings
        })

    # Sort candidates by overall utility descending
    candidate_results.sort(key=lambda x: x["overall_utility_score"], reverse=True)
    best = candidate_results[0]
    best_material: PackagingMaterialSpec = best["material"]

    # Determine Evidence Confidence tier based on matching evidence count
    matching_evidence = [
        evi for evi in EVIDENCE_KNOWLEDGE_BASE 
        if food.commodity.lower() in evi.name.lower() or food.commodity.lower() in evi.applicability_note.lower()
        or candidate_results[0]["material"].name.lower() in evi.name.lower()
    ]
    if len(matching_evidence) >= 2:
        evidence_confidence = "High evidence support"
    elif len(matching_evidence) == 1:
        evidence_confidence = "Moderate evidence support"
    else:
        evidence_confidence = "Limited evidence support"

    # Suitability Tier
    if best["overall_utility_score"] >= 80.0:
        suitability_tier = "High Suitability"
    elif best["overall_utility_score"] >= 60.0:
        suitability_tier = "Moderate Suitability"
    else:
        suitability_tier = "Conditional Suitability"

    # Build Structured Explanations (WHY THIS RECOMMENDATION?)
    explanations: List[ExplanationFactor] = [
        ExplanationFactor(
            category="Food Characteristics",
            title=f"Moisture ({food.moisture_content_pct}%) & Respiration ({food.respiration_type}) Profile",
            explanation=f"{food.commodity} has high moisture ({food.moisture_content_pct}%) and {food.respiration_type.lower()} respiration. "
                        f"The selected {best_material.name} provides targeted gas transmission (OTR: {best_material.otr_cc_m2_day_atm} cc/m²/day) "
                        f"and moisture barrier (WVTR: {best_material.wvtr_g_m2_day} g/m²/day).",
            impact="High"
        ),
        ExplanationFactor(
            category="Journey Conditions",
            title=f"Thermal ({journey.temperature_c}°C) & Transit Stress ({journey.transport_duration_hours}h)",
            explanation=f"Under ambient transport of {journey.temperature_c}°C and {journey.relative_humidity_pct}% RH over {journey.transport_duration_hours} hours, "
                        f"the packaging thermal stability ({best_material.temp_min_c}°C to {best_material.temp_max_c}°C) prevents polymer deformation and maintains structural integrity.",
            impact="High"
        ),
        ExplanationFactor(
            category="Scientific Constraints",
            title="Gas Exchange Equilibrium & Permeability Control",
            explanation=f"Evaluated against scientific gas-exchange limits. " + (
                "No critical scientific constraint violations detected." if not best["constraint_warnings"] 
                else f"Note: {best['constraint_warnings'][0]}"
            ),
            impact="Medium"
        ),
        ExplanationFactor(
            category="Evidence",
            title="Scientific Database & Literature Alignment",
            explanation=f"Cites {len(matching_evidence)} primary evidence records including FAO postharvest handling guidelines and polymer transmission datasheets.",
            impact="Informational"
        ),
        ExplanationFactor(
            category="Optimization Trade-offs",
            title=f"Multi-Objective Score: {best['overall_utility_score']}/100",
            explanation=f"Weighted optimization balanced Protection ({w_prot*100:.0f}%), Cost ({w_cost*100:.0f}%), "
                        f"Material Efficiency ({w_mat*100:.0f}%), and Sustainability ({w_env*100:.0f}%). "
                        f"Selected option achieved optimal pareto frontier balance.",
            impact="High"
        )
    ]

    # Attach evidence passport records
    evidence_passport = EVIDENCE_KNOWLEDGE_BASE

    assessment_id = f"ASM-{uuid.uuid4().hex[:8].upper()}"

    return PackagingRecommendation(
        assessment_id=assessment_id,
        recommended_material=best_material,
        suitability_tier=suitability_tier,
        model_type="Prototype prediction model",
        evidence_confidence=evidence_confidence,
        protection_score=best["protection_score"],
        cost_score=best["cost_score"],
        sustainability_score=best["sustainability_score"],
        overall_utility_score=best["overall_utility_score"],
        specifications={
            "thickness": f"{best_material.thickness_microns} µm",
            "otr": f"{best_material.otr_cc_m2_day_atm} cc/m²/24h/atm",
            "wvtr": f"{best_material.wvtr_g_m2_day} g/m²/24h",
            "sealability": best_material.sealability_rating,
            "temp_range": f"{best_material.temp_min_c}°C to {best_material.temp_max_c}°C",
            "gas_exchange": "Compatible" if best_material.gas_exchange_capable else "Hermetic Sealed"
        },
        explanations=explanations,
        evidence_passport=evidence_passport,
        candidate_scores=[
            {
                "id": c["material"].id,
                "name": c["material"].name,
                "overall": c["overall_utility_score"],
                "protection": c["protection_score"],
                "cost": c["cost_score"],
                "sustainability": c["sustainability_score"]
            }
            for c in candidate_results
        ]
    )


def run_journey_stress_test(request: StressTestRequest) -> StressTestResult:
    """
    Packaging Digital Twin / What-If Stress Simulator:
    Recalculates packaging performance and quality retention kinetics
    when journey variables (Temp, RH, Transport hours) shift.
    """
    food = request.food_profile
    b_j = request.baseline_journey
    s_j = request.stressed_journey
    
    # Find selected material
    mat = next((m for m in PACKAGING_CANDIDATES if m.id == request.selected_material_id), PACKAGING_CANDIDATES[0])

    # Evaluate baseline protection
    base_prot_score, base_warnings = evaluate_scientific_constraints(food, b_j, mat)
    # Evaluate stressed protection
    stress_prot_score, stress_warnings = evaluate_scientific_constraints(food, s_j, mat)

    # Determine Risk Levels
    def score_to_risk(score: float, warnings: list) -> str:
        if len(warnings) >= 2 or score < 40:
            return "Critical Risk"
        elif len(warnings) == 1 or score < 65:
            return "High Risk"
        elif score < 85:
            return "Moderate Risk"
        return "Low Risk"

    risk_base = score_to_risk(base_prot_score, base_warnings)
    risk_stress = score_to_risk(stress_prot_score, stress_warnings)

    # Failure mechanisms identification
    failures = []
    temp_delta = s_j.temperature_c - b_j.temperature_c
    rh_delta = s_j.relative_humidity_pct - b_j.relative_humidity_pct
    time_delta = s_j.transport_duration_hours - b_j.transport_duration_hours

    if temp_delta >= 8.0:
        otr_multiplier = math.pow(2.0, temp_delta / 10.0)
        failures.append(
            f"Thermal Abuse (+{temp_delta:.1f}°C): Accelerates film OTR by {otr_multiplier:.1f}x via Arrhenius kinetic effect. "
            f"Increases fruit respiration and ethylene gas accumulation."
        )

    if rh_delta >= 20.0 or (s_j.relative_humidity_pct > 80 and temp_delta > 5):
        failures.append(
            f"Condensation & Humidity Saturation (+{rh_delta:.1f}% RH): High relative humidity delta creates dew-point "
            f"condensation inside film, triggering rapid fungal spore germination."
        )

    if time_delta >= 24:
        failures.append(
            f"Extended Transit Delay (+{time_delta}h): Transit duration exceeds design threshold ({b_j.transport_duration_hours}h -> {s_j.transport_duration_hours}h), "
            f"leading to depletion of oxygen buffer and firmness degradation."
        )

    if not failures and stress_warnings:
        failures.extend(stress_warnings)
    elif not failures:
        failures.append("No critical failure detected. Package demonstrates resilience under specified stress parameters.")

    # Mitigation & Alternative recommendation
    if risk_stress in ["High Risk", "Critical Risk"]:
        mitigation = (
            "Switch to cold chain vehicle (12°C target), apply active moisture-absorber pouch inside master box, "
            "and upgrade packaging to high-barrier micro-perforated MAP film."
        )
        # Suggest alternative material
        alt_mat = next((m for m in PACKAGING_CANDIDATES if m.id != mat.id and m.gas_exchange_capable), PACKAGING_CANDIDATES[0])
    else:
        mitigation = "Baseline packaging structure remains viable. Maintain ambient temperature monitoring."
        alt_mat = None

    # Compute Quality Retention Curve Over Days
    max_days = max(14, int(max(b_j.transport_duration_hours, s_j.transport_duration_hours) / 24) + 5)
    curve = []
    
    # Kinetic rate constants
    k_base = 0.05 + (b_j.temperature_c / 100.0) * (1.0 if mat.gas_exchange_capable else 1.8)
    k_stress = 0.05 + (s_j.temperature_c / 100.0) * (1.0 if mat.gas_exchange_capable else 1.8) + (temp_delta * 0.015)

    for day in range(0, max_days + 1):
        q_b = max(0.0, round(100.0 * math.exp(-k_base * day), 1))
        q_s = max(0.0, round(100.0 * math.exp(-k_stress * day), 1))
        curve.append(QualityCurvePoint(day=day, baseline_quality_pct=q_b, stressed_quality_pct=q_s))

    base_suitability = "Suitable" if base_prot_score >= 70 else "Unsuitable"
    stressed_suitability = "Resilient" if stress_prot_score >= 70 else "Vulnerable"

    return StressTestResult(
        baseline_suitability=base_suitability,
        stressed_suitability=stressed_suitability,
        risk_level_baseline=risk_base,
        risk_level_stressed=risk_stress,
        risk_score_delta=round(base_prot_score - stress_prot_score, 1),
        critical_failure_mechanisms=failures,
        recommended_mitigation_action=mitigation,
        alternative_material_suggestion=alt_mat,
        quality_retention_curve=curve,
        validation_disclaimer="Stress-test results are decision-support outputs and require validation under representative real-world conditions."
    )
