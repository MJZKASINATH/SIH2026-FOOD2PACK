from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import datetime

from models import (
    AssessmentRequest, PackagingRecommendation,
    StressTestRequest, StressTestResult, PackagingMaterialSpec, EvidenceRecord
)
from knowledge_db import DEMO_FOOD_PROFILES, PACKAGING_CANDIDATES, EVIDENCE_KNOWLEDGE_BASE
from engine import compute_multi_objective_recommendation, run_journey_stress_test

app = FastAPI(
    title="FOOD2PACK REST API",
    description="AI-Based Intelligent Food Packaging Material Recommendation & Decision-Support System",
    version="1.0.0"
)

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for recent assessments
ASSESSMENT_HISTORY_STORE: List[Dict[str, Any]] = []

@app.get("/")
def read_root():
    return {
        "project": "FOOD2PACK",
        "title": "AI-Based Intelligent Food Packaging Material Recommendation System for Food Commodities",
        "ps_id": "SIH26236",
        "team": "TrustUs (Team ID: 155684)",
        "tagline": "Design the package for the journey, not just the product.",
        "principle": "AI proposes. Scientific constraints protect. Evidence validates.",
        "status": "Online",
        "positioning_notice": "Decision-Support System — Final packaging selection requires technical and laboratory validation."
    }

@app.get("/api/foods")
def get_foods():
    return {
        "commodities": list(DEMO_FOOD_PROFILES.keys()),
        "profiles": DEMO_FOOD_PROFILES,
        "primary_demo": "Tomato"
    }

@app.get("/api/foods/{name}")
def get_food_detail(name: str):
    # Case-insensitive lookup
    match = next((v for k, v in DEMO_FOOD_PROFILES.items() if k.lower() == name.lower()), None)
    if not match:
        raise HTTPException(status_code=404, detail=f"Food commodity '{name}' not found in knowledge database.")
    return match

@app.get("/api/materials", response_model=List[PackagingMaterialSpec])
def get_materials():
    return PACKAGING_CANDIDATES

@app.get("/api/evidence", response_model=List[EvidenceRecord])
def get_evidence(
    search: Optional[str] = None,
    category: Optional[str] = None,
    confidence: Optional[str] = None
):
    results = EVIDENCE_KNOWLEDGE_BASE
    if search:
        s = search.lower()
        results = [
            e for e in results 
            if s in e.name.lower() or s in e.property.lower() or s in e.source.lower() or s in e.applicability_note.lower()
        ]
    if category and category != "All":
        results = [e for e in results if e.category.lower() == category.lower()]
    if confidence and confidence != "All":
        results = [e for e in results if e.confidence.lower() == confidence.lower()]
    return results

@app.post("/api/assessment", response_model=PackagingRecommendation)
def create_assessment(request: AssessmentRequest):
    recommendation = compute_multi_objective_recommendation(request)
    
    # Save to history store
    ASSESSMENT_HISTORY_STORE.insert(0, {
        "id": recommendation.assessment_id,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "commodity": request.food_profile.commodity,
        "journey": f"{request.journey_profile.temperature_c}°C / {request.journey_profile.relative_humidity_pct}% RH / {request.journey_profile.transport_duration_hours}h",
        "recommended_material": recommendation.recommended_material.name,
        "suitability": recommendation.suitability_tier,
        "utility_score": recommendation.overall_utility_score,
        "request": request.model_dump(),
        "recommendation": recommendation.model_dump()
    })
    
    return recommendation

@app.post("/api/stress-test", response_model=StressTestResult)
def stress_test(request: StressTestRequest):
    return run_journey_stress_test(request)

@app.get("/api/assessments")
def get_assessment_history():
    # If empty, return initial demo assessment item
    if not ASSESSMENT_HISTORY_STORE:
        return [
            {
                "id": "ASM-DEMO-001",
                "timestamp": "2026-10-01 10:30",
                "commodity": "Tomato",
                "journey": "25.0°C / 60.0% RH / 48h",
                "recommended_material": "MAP EVOH/PE High-Barrier Respiration-Matched Film",
                "suitability": "High Suitability",
                "utility_score": 86.4,
                "is_demo": True
            }
        ]
    return ASSESSMENT_HISTORY_STORE

@app.get("/api/methodology")
def get_methodology():
    return {
        "pipeline_stages": [
            {
                "step": 1,
                "title": "FOOD FINGERPRINT",
                "description": "Constructs multi-dimensional food physical profile (Moisture %, Fat %, pH, respiration dynamics, transpiration constant)."
            },
            {
                "step": 2,
                "title": "JOURNEY PROFILE",
                "description": "Captures transit environmental stresses (Temperature °C, Relative Humidity %, Duration hours, Storage regime, Transport mode)."
            },
            {
                "step": 3,
                "title": "EVIDENCE ENGINE",
                "description": "Queries peer-reviewed postharvest science, polymer datasheets, and regulatory standards to retrieve hard physical constraints."
            },
            {
                "step": 4,
                "title": "SCIENTIFIC CONSTRAINTS",
                "description": "Evaluates mandatory boundary conditions (Gas exchange matching, moisture migration thresholds, thermal polymer limits)."
            },
            {
                "step": 5,
                "title": "PREDICTIVE ML",
                "description": "Runs prototype prediction model to evaluate candidate packaging performance scores and confidence bounds."
            },
            {
                "step": 6,
                "title": "MULTI-OBJECTIVE OPTIMIZATION",
                "description": "Solves pareto trade-offs across Protection, Cost, Material Efficiency, and Environmental Sustainability based on user preference weights."
            },
            {
                "step": 7,
                "title": "EXPLAINABLE RECOMMENDATION",
                "description": "Generates transparent, scientifically-justified reasoning cards and attaches an Evidence Passport for peer auditing."
            },
            {
                "step": 8,
                "title": "JOURNEY STRESS TEST",
                "description": "Packaging Digital Twin simulator: Recalculates risk kinetics and quality decay curves under thermal abuse or transit delays."
            }
        ],
        "disclaimer": "FOOD2PACK is an AI-based decision-support system. Final packaging selection requires appropriate technical and laboratory validation."
    }
