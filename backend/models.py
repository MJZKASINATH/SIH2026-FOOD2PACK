from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class FoodProfile(BaseModel):
    commodity: str = Field(..., description="Food commodity name, e.g. Tomato, Mango")
    form: str = Field("Fresh Whole", description="e.g. Fresh Whole, Fresh Cut, Processed, Dried")
    moisture_content_pct: float = Field(..., description="Moisture content in %")
    fat_oil_content_pct: float = Field(..., description="Fat/oil content in %")
    ph_level: float = Field(..., description="pH level of the food commodity")
    respiration_type: str = Field(..., description="Active, Moderate, Low, Non-respiring")
    target_shelf_life_days: int = Field(..., description="Desired shelf life in days")

class JourneyProfile(BaseModel):
    temperature_c: float = Field(25.0, description="Ambient temperature during transit in °C")
    relative_humidity_pct: float = Field(60.0, description="Relative humidity %")
    transport_duration_hours: int = Field(48, description="Transport duration in hours")
    storage_condition: str = Field("Ambient", description="Ambient, Refrigerated, Controlled Atmosphere")
    transport_mode: str = Field("Road Freight", description="Road Freight, Cold Chain Vehicle, Air Freight, Sea Container")
    mechanical_vibration_risk: str = Field("Moderate", description="Low, Moderate, High")

class PackagingObjectives(BaseModel):
    protection_weight: float = Field(0.40, description="Priority weight for food protection (0-1)")
    cost_weight: float = Field(0.25, description="Priority weight for cost efficiency (0-1)")
    material_efficiency_weight: float = Field(0.20, description="Priority weight for material efficiency (0-1)")
    environmental_weight: float = Field(0.15, description="Priority weight for environmental sustainability (0-1)")

class AssessmentRequest(BaseModel):
    food_profile: FoodProfile
    journey_profile: JourneyProfile
    objectives: PackagingObjectives

class PackagingMaterialSpec(BaseModel):
    id: str
    name: str
    structure: str
    thickness_microns: int
    otr_cc_m2_day_atm: float  # Oxygen Transmission Rate
    wvtr_g_m2_day: float       # Water Vapour Transmission Rate
    sealability_rating: str    # High, Medium, Low
    temp_min_c: float
    temp_max_c: float
    gas_exchange_capable: bool
    cost_index: float          # 1.0 = baseline standard
    sustainability_score: float # 1-10 scale
    food_applications: List[str]
    evidence_status: str

class EvidenceRecord(BaseModel):
    id: str
    name: str
    category: str              # Research Literature, Food Property Database, Packaging Material Data, Manufacturer Datasheet, Regulatory Requirement
    property: str
    value: str
    unit: str
    conditions: str
    source: str
    confidence: str            # High, Moderate, Limited
    last_updated: str
    applicability_note: str

class ExplanationFactor(BaseModel):
    category: str              # Food Characteristics, Journey Conditions, Scientific Constraints, Evidence, Optimization Trade-offs
    title: str
    explanation: str
    impact: str                # High, Medium, Informational

class PackagingRecommendation(BaseModel):
    assessment_id: str
    recommended_material: PackagingMaterialSpec
    suitability_tier: str       # High Suitability, Moderate Suitability, Conditional Suitability
    model_type: str            # "Prototype prediction model" / "Demonstration model"
    evidence_confidence: str    # "High evidence support", "Moderate evidence support", "Limited evidence support"
    protection_score: float     # 0-100
    cost_score: float           # 0-100
    sustainability_score: float # 0-100
    overall_utility_score: float # 0-100
    specifications: Dict[str, Any]
    explanations: List[ExplanationFactor]
    evidence_passport: List[EvidenceRecord]
    candidate_scores: List[Dict[str, Any]]

class StressTestRequest(BaseModel):
    assessment_id: Optional[str] = None
    food_profile: FoodProfile
    baseline_journey: JourneyProfile
    stressed_journey: JourneyProfile
    selected_material_id: str

class QualityCurvePoint(BaseModel):
    day: int
    baseline_quality_pct: float
    stressed_quality_pct: float

class StressTestResult(BaseModel):
    baseline_suitability: str
    stressed_suitability: str
    risk_level_baseline: str     # Low Risk, Moderate Risk, High Risk, Critical Risk
    risk_level_stressed: str     # Low Risk, Moderate Risk, High Risk, Critical Risk
    risk_score_delta: float
    critical_failure_mechanisms: List[str]
    recommended_mitigation_action: str
    alternative_material_suggestion: Optional[PackagingMaterialSpec] = None
    quality_retention_curve: List[QualityCurvePoint]
    validation_disclaimer: str
