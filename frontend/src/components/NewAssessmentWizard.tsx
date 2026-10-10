import React, { useState, useEffect } from 'react';
import {
  Sparkles, Check, ChevronRight, ChevronLeft, Database, Thermometer, Sliders,
  Cpu, RefreshCw
} from 'lucide-react';
import type { FoodProfile, JourneyProfile, PackagingObjectives, AssessmentRequest } from '../types';
import { fetchFoodProfiles } from '../api';

interface NewAssessmentWizardProps {
  initialCommodity?: string;
  onComplete: (request: AssessmentRequest) => void;
}

export const NewAssessmentWizard: React.FC<NewAssessmentWizardProps> = ({
  initialCommodity,
  onComplete
}) => {
  const [step, setStep] = useState<number>(1);
  const [profiles, setProfiles] = useState<Record<string, FoodProfile>>({});
  const [selectedCommodity, setSelectedCommodity] = useState<string>(initialCommodity || 'Tomato');

  // Step 1 State: Food Profile
  const [foodProfile, setFoodProfile] = useState<FoodProfile>({
    commodity: 'Tomato',
    form: 'Fresh Whole (Vine Ripe)',
    moisture_content_pct: 94.5,
    fat_oil_content_pct: 0.2,
    ph_level: 4.3,
    respiration_type: 'Active (Climacteric)',
    target_shelf_life_days: 14
  });

  // Step 2 State: Journey Profile
  const [journeyProfile, setJourneyProfile] = useState<JourneyProfile>({
    temperature_c: 25.0,
    relative_humidity_pct: 60.0,
    transport_duration_hours: 48,
    storage_condition: 'Ambient',
    transport_mode: 'Road Freight',
    mechanical_vibration_risk: 'Moderate'
  });

  // Step 3 State: Objectives
  const [objectives, setObjectives] = useState<PackagingObjectives>({
    protection_weight: 0.40,
    cost_weight: 0.25,
    material_efficiency_weight: 0.20,
    environmental_weight: 0.15
  });

  // Step 4 State: Running assessment animation
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  const pipelineSteps = [
    "Building food physical fingerprint...",
    "Querying scientific evidence database...",
    "Evaluating gas-exchange & moisture scientific constraints...",
    "Scoring packaging material candidates...",
    "Executing multi-objective pareto optimization...",
    "Generating explainable packaging recommendation & passport..."
  ];

  useEffect(() => {
    fetchFoodProfiles().then((data) => {
      setProfiles(data.profiles);
      if (initialCommodity && data.profiles[initialCommodity]) {
        setFoodProfile(data.profiles[initialCommodity]);
      }
    });
  }, [initialCommodity]);

  const handleCommoditySelect = (commodityName: string) => {
    setSelectedCommodity(commodityName);
    if (profiles[commodityName]) {
      setFoodProfile(profiles[commodityName]);
    } else {
      setFoodProfile({
        commodity: commodityName,
        form: 'Fresh Whole',
        moisture_content_pct: 75.0,
        fat_oil_content_pct: 1.0,
        ph_level: 5.5,
        respiration_type: 'Moderate',
        target_shelf_life_days: 14
      });
    }
  };

  const handleRunAssessment = () => {
    setStep(4);
    setPipelineStep(0);

    // Simulate animated pipeline step sequence
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < pipelineSteps.length) {
        setPipelineStep(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete({
            food_profile: foodProfile,
            journey_profile: journeyProfile,
            objectives: objectives
          });
        }, 600);
      }
    }, 600);
  };

  const totalWeight = objectives.protection_weight + objectives.cost_weight + objectives.material_efficiency_weight + objectives.environmental_weight;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Wizard Header Stepper Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">New Packaging Assessment</h1>
            <p className="text-xs text-slate-500">Configure food & journey parameters for scientific decision support</p>
          </div>
          <div className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-mono font-semibold border border-blue-200">
            Step {step} of 4
          </div>
        </div>

        {/* Stepper Dots */}
        <div className="mt-6 grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "Food Profile" },
            { num: 2, label: "Journey Profile" },
            { num: 3, label: "Objectives" },
            { num: 4, label: "Evaluation" }
          ].map((s) => (
            <div key={s.num} className="space-y-1.5">
              <div className={`h-2 rounded-full transition-all ${
                step === s.num ? 'bg-blue-600' : step > s.num ? 'bg-emerald-500' : 'bg-slate-200'
              }`}></div>
              <div className="text-[11px] font-semibold text-slate-600 text-center flex items-center justify-center space-x-1">
                {step > s.num && <Check className="w-3 h-3 text-emerald-600" />}
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: FOOD PROFILE */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 1: Food Commodity Profile</h2>
              <p className="text-xs text-slate-500">Select or customize food physical properties</p>
            </div>
          </div>

          {/* Commodity Selector Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Select Commodity (Demonstration Data Available)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Tomato", demo: true },
                { name: "Apple", demo: true },
                { name: "Mango", demo: true },
                { name: "Potato", demo: true },
                { name: "Leafy Vegetables", demo: true },
                { name: "Grains", demo: true },
                { name: "Bakery Product", demo: true },
                { name: "Processed Food", demo: true },
                { name: "Custom Food", demo: false }
              ].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleCommoditySelect(c.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                    selectedCommodity === c.name
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.name}</span>
                  {c.demo && (
                    <span className={`text-[9px] px-1 rounded ${
                      selectedCommodity === c.name ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-600'
                    }`}>
                      Demo
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Food Parameter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Form */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Food Form / State</label>
              <input
                type="text"
                value={foodProfile.form}
                onChange={(e) => setFoodProfile({ ...foodProfile, form: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Target Shelf Life */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Target Shelf Life (Days)</label>
              <input
                type="number"
                value={foodProfile.target_shelf_life_days}
                onChange={(e) => setFoodProfile({ ...foodProfile, target_shelf_life_days: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Moisture Content Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Moisture Content (%)</span>
                <span className="text-blue-600">{foodProfile.moisture_content_pct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={foodProfile.moisture_content_pct}
                onChange={(e) => setFoodProfile({ ...foodProfile, moisture_content_pct: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Fat Content Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Fat / Oil Content (%)</span>
                <span className="text-blue-600">{foodProfile.fat_oil_content_pct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="0.1"
                value={foodProfile.fat_oil_content_pct}
                onChange={(e) => setFoodProfile({ ...foodProfile, fat_oil_content_pct: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* pH Level */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>pH Level</span>
                <span className="text-blue-600">{foodProfile.ph_level}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="14.0"
                step="0.1"
                value={foodProfile.ph_level}
                onChange={(e) => setFoodProfile({ ...foodProfile, ph_level: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Respiration Characteristics */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Respiration Category</label>
              <select
                value={foodProfile.respiration_type}
                onChange={(e) => setFoodProfile({ ...foodProfile, respiration_type: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Active (Climacteric)">Active (Climacteric — Tomato/Mango)</option>
                <option value="Moderate (Climacteric)">Moderate (Climacteric — Apple)</option>
                <option value="Very Active">Very Active (Leafy Cut Greens)</option>
                <option value="Low (Non-climacteric)">Low (Non-climacteric — Potato)</option>
                <option value="Non-respiring">Non-respiring (Grains/Bakery/Snacks)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>Next: Journey Profile</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: JOURNEY PROFILE */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 2: Journey & Transport Environment</h2>
              <p className="text-xs text-slate-500">Define transit environmental stresses and storage conditions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature Slider */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Ambient Temperature</span>
                <span className="text-base text-blue-700 font-mono font-extrabold">{journeyProfile.temperature_c} °C</span>
              </div>
              <input
                type="range"
                min="-10"
                max="50"
                step="0.5"
                value={journeyProfile.temperature_c}
                onChange={(e) => setJourneyProfile({ ...journeyProfile, temperature_c: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>-10°C (Cold Chain)</span>
                <span>25°C (Ambient)</span>
                <span>50°C (Extreme Heat)</span>
              </div>
            </div>

            {/* Relative Humidity Slider */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Relative Humidity (RH)</span>
                <span className="text-base text-blue-700 font-mono font-extrabold">{journeyProfile.relative_humidity_pct} %</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={journeyProfile.relative_humidity_pct}
                onChange={(e) => setJourneyProfile({ ...journeyProfile, relative_humidity_pct: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10% (Arid)</span>
                <span>60% (Moderate)</span>
                <span>100% (Saturated)</span>
              </div>
            </div>

            {/* Transport Duration Slider */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Transport Duration</span>
                <span className="text-base text-blue-700 font-mono font-extrabold">{journeyProfile.transport_duration_hours} hours</span>
              </div>
              <input
                type="range"
                min="6"
                max="240"
                step="6"
                value={journeyProfile.transport_duration_hours}
                onChange={(e) => setJourneyProfile({ ...journeyProfile, transport_duration_hours: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>6h (Local)</span>
                <span>48h (Interstate)</span>
                <span>240h (Export)</span>
              </div>
            </div>

            {/* Storage Condition Dropdown */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Storage Regime</label>
              <select
                value={journeyProfile.storage_condition}
                onChange={(e) => setJourneyProfile({ ...journeyProfile, storage_condition: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Ambient">Ambient Uncontrolled Storage</option>
                <option value="Refrigerated">Refrigerated Cold Chain (4-12°C)</option>
                <option value="Controlled Atmosphere">Controlled Atmosphere (CA / Low O2)</option>
              </select>
              <p className="text-[10px] text-slate-500">Influences respiration degradation kinetic rates</p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>Next: Packaging Objectives</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PACKAGING OBJECTIVES */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 3: Multi-Objective Trade-off Priorities</h2>
              <p className="text-xs text-slate-500">Set weighted preferences for optimization Pareto frontier</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Protection Weight */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Food Protection Priority (Barrier & Gas Fit)</span>
                <span className="text-blue-600">{Math.round(objectives.protection_weight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.70"
                step="0.05"
                value={objectives.protection_weight}
                onChange={(e) => setObjectives({ ...objectives, protection_weight: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Cost Weight */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Cost Efficiency Priority</span>
                <span className="text-blue-600">{Math.round(objectives.cost_weight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.50"
                step="0.05"
                value={objectives.cost_weight}
                onChange={(e) => setObjectives({ ...objectives, cost_weight: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Material Efficiency */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Material Efficiency Priority (Lightweighting)</span>
                <span className="text-blue-600">{Math.round(objectives.material_efficiency_weight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={objectives.material_efficiency_weight}
                onChange={(e) => setObjectives({ ...objectives, material_efficiency_weight: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Environmental Trade-off */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Environmental & Bio-sustainability Priority</span>
                <span className="text-blue-600">{Math.round(objectives.environmental_weight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={objectives.environmental_weight}
                onChange={(e) => setObjectives({ ...objectives, environmental_weight: Number(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">Total Objective Weight Sum:</span>
            <span className="font-mono font-bold text-slate-900">{Math.round(totalWeight * 100)}%</span>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleRunAssessment}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Packaging Options</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PROCESSING PIPELINE ANIMATION */}
      {step === 4 && (
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40 animate-pulse">
            <Cpu className="w-8 h-8 text-blue-400 animate-spin" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">FOOD2PACK Scientific Evaluation Engine</h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">Executing decision pipeline...</p>
          </div>

          {/* Stepper Pipeline List */}
          <div className="max-w-md mx-auto space-y-2 text-left text-xs font-mono">
            {pipelineSteps.map((stepText, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border transition-all flex items-center space-x-3 ${
                  idx < pipelineStep
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    : idx === pipelineStep
                    ? 'bg-blue-950/80 border-blue-600/80 text-blue-200 shadow-sm'
                    : 'bg-slate-800/40 border-slate-800 text-slate-600'
                }`}
              >
                {idx < pipelineStep ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : idx === pipelineStep ? (
                  <RefreshCw className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0"></div>
                )}
                <span>{stepText}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
