export interface FoodProfile {
  commodity: string;
  form: string;
  moisture_content_pct: number;
  fat_oil_content_pct: number;
  ph_level: number;
  respiration_type: string;
  target_shelf_life_days: number;
}

export interface JourneyProfile {
  temperature_c: number;
  relative_humidity_pct: number;
  transport_duration_hours: number;
  storage_condition: string;
  transport_mode: string;
  mechanical_vibration_risk: string;
}

export interface PackagingObjectives {
  protection_weight: number;
  cost_weight: number;
  material_efficiency_weight: number;
  environmental_weight: number;
}

export interface AssessmentRequest {
  food_profile: FoodProfile;
  journey_profile: JourneyProfile;
  objectives: PackagingObjectives;
}

export interface PackagingMaterialSpec {
  id: string;
  name: string;
  structure: string;
  thickness_microns: number;
  otr_cc_m2_day_atm: number;
  wvtr_g_m2_day: number;
  sealability_rating: string;
  temp_min_c: number;
  temp_max_c: number;
  gas_exchange_capable: boolean;
  cost_index: number;
  sustainability_score: number;
  food_applications: string[];
  evidence_status: string;
}

export interface EvidenceRecord {
  id: string;
  name: string;
  category: string;
  property: string;
  value: string;
  unit: string;
  conditions: string;
  source: string;
  confidence: string;
  last_updated: string;
  applicability_note: string;
}

export interface ExplanationFactor {
  category: string;
  title: string;
  explanation: string;
  impact: string;
}

export interface PackagingRecommendation {
  assessment_id: string;
  recommended_material: PackagingMaterialSpec;
  suitability_tier: string;
  model_type: string;
  evidence_confidence: string;
  protection_score: number;
  cost_score: number;
  sustainability_score: number;
  overall_utility_score: number;
  specifications: Record<string, string>;
  explanations: ExplanationFactor[];
  evidence_passport: EvidenceRecord[];
  candidate_scores: Array<{
    id: string;
    name: string;
    overall: number;
    protection: number;
    cost: number;
    sustainability: number;
  }>;
}

export interface StressTestRequest {
  assessment_id?: string;
  food_profile: FoodProfile;
  baseline_journey: JourneyProfile;
  stressed_journey: JourneyProfile;
  selected_material_id: string;
}

export interface QualityCurvePoint {
  day: number;
  baseline_quality_pct: number;
  stressed_quality_pct: number;
}

export interface StressTestResult {
  baseline_suitability: string;
  stressed_suitability: string;
  risk_level_baseline: string;
  risk_level_stressed: string;
  risk_score_delta: number;
  critical_failure_mechanisms: string[];
  recommended_mitigation_action: string;
  alternative_material_suggestion?: PackagingMaterialSpec;
  quality_retention_curve: QualityCurvePoint[];
  validation_disclaimer: string;
}

export interface AssessmentHistoryItem {
  id: string;
  timestamp: string;
  commodity: string;
  journey: string;
  recommended_material: string;
  suitability: string;
  utility_score: number;
  is_demo?: boolean;
}
