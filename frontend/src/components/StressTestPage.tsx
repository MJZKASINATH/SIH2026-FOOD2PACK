import React, { useState, useEffect } from 'react';
import {
  AlertTriangle, ShieldCheck, Thermometer, RefreshCw,
  TrendingDown, AlertOctagon, Info
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import type { JourneyProfile, FoodProfile, StressTestRequest, StressTestResult } from '../types';
import { submitStressTest } from '../api';

interface StressTestPageProps {
  currentFoodProfile?: FoodProfile;
  currentBaselineJourney?: JourneyProfile;
}

export const StressTestPage: React.FC<StressTestPageProps> = ({
  currentFoodProfile,
  currentBaselineJourney
}) => {
  // Default food profile if none provided
  const food: FoodProfile = currentFoodProfile || {
    commodity: "Tomato",
    form: "Fresh Whole (Vine Ripe)",
    moisture_content_pct: 94.5,
    fat_oil_content_pct: 0.2,
    ph_level: 4.3,
    respiration_type: "Active (Climacteric)",
    target_shelf_life_days: 14
  };

  // Baseline Journey
  const baseline: JourneyProfile = currentBaselineJourney || {
    temperature_c: 25.0,
    relative_humidity_pct: 60.0,
    transport_duration_hours: 48,
    storage_condition: "Ambient",
    transport_mode: "Road Freight",
    mechanical_vibration_risk: "Moderate"
  };

  // Stressed Journey controls state
  const [stressed, setStressed] = useState<JourneyProfile>({
    temperature_c: 38.0,
    relative_humidity_pct: 85.0,
    transport_duration_hours: 96,
    storage_condition: "Ambient",
    transport_mode: "Road Freight",
    mechanical_vibration_risk: "High"
  });

  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("MAT-MAP-EVOH-01");
  const [result, setResult] = useState<StressTestResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runSimulation = async () => {
    setLoading(true);
    const req: StressTestRequest = {
      food_profile: food,
      baseline_journey: baseline,
      stressed_journey: stressed,
      selected_material_id: selectedMaterialId
    };
    const res = await submitStressTest(req);
    setResult(res);
    setLoading(false);
  };

  useEffect(() => {
    runSimulation();
  }, [stressed, selectedMaterialId]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Packaging Digital Twin
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              What-If Stress Simulator
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            JOURNEY STRESS TEST
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            "How does the packaging decision change when the journey changes?"
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={runSimulation}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Recalculate Digital Twin</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Controls & Digital Twin Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Baseline Summary Card */}
          <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-300">BASELINE JOURNEY (Reference)</span>
              <span className="font-mono text-blue-400">{food.commodity}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-[10px] text-slate-400 block">Temp</span>
                <span className="font-bold text-white">{baseline.temperature_c}°C</span>
              </div>
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-[10px] text-slate-400 block">RH</span>
                <span className="font-bold text-white">{baseline.relative_humidity_pct}%</span>
              </div>
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-[10px] text-slate-400 block">Duration</span>
                <span className="font-bold text-white">{baseline.transport_duration_hours}h</span>
              </div>
            </div>
          </div>

          {/* Stressed Journey Interactive Sliders */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
                <Thermometer className="w-4 h-4 text-amber-600" />
                <span>Simulate Stressed Journey Shifts</span>
              </h3>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Interactive
              </span>
            </div>

            {/* Temperature Shift Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Stressed Temperature Spike</span>
                <span className={`font-mono text-sm ${stressed.temperature_c > baseline.temperature_c ? 'text-red-600' : 'text-slate-900'}`}>
                  {stressed.temperature_c} °C ({stressed.temperature_c - baseline.temperature_c > 0 ? `+${(stressed.temperature_c - baseline.temperature_c).toFixed(1)}°C` : '0°C'})
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={stressed.temperature_c}
                onChange={(e) => setStressed({ ...stressed, temperature_c: Number(e.target.value) })}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10°C</span>
                <span>25°C Baseline</span>
                <span>50°C Heatwave</span>
              </div>
            </div>

            {/* Relative Humidity Shift Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Relative Humidity Exposure</span>
                <span className="font-mono text-sm text-indigo-600">
                  {stressed.relative_humidity_pct} %
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={stressed.relative_humidity_pct}
                onChange={(e) => setStressed({ ...stressed, relative_humidity_pct: Number(e.target.value) })}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>20% Arid</span>
                <span>60% Baseline</span>
                <span>100% Saturated</span>
              </div>
            </div>

            {/* Transport Delay Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Extended Transport Delay</span>
                <span className="font-mono text-sm text-purple-600">
                  {stressed.transport_duration_hours} hours (+{stressed.transport_duration_hours - baseline.transport_duration_hours}h delay)
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="168"
                step="12"
                value={stressed.transport_duration_hours}
                onChange={(e) => setStressed({ ...stressed, transport_duration_hours: Number(e.target.value) })}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>24h</span>
                <span>48h Target</span>
                <span>168h Delay</span>
              </div>
            </div>

            {/* Packaging Material Selector */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 block">Evaluated Packaging Structure</label>
              <select
                value={selectedMaterialId}
                onChange={(e) => setSelectedMaterialId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800"
              >
                <option value="MAT-MAP-EVOH-01">MAP EVOH/PE High-Barrier Film (65µm)</option>
                <option value="MAT-PLA-PERF-02">Bio-PLA Micro-Perforated Packaging (35µm)</option>
                <option value="MAT-FOIL-LAM-03">PET/ALU/PE Hermetic Foil Laminate (70µm)</option>
                <option value="MAT-LDPE-STD-04">Standard LDPE Polybag (45µm)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Digital Twin Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Risk Shift Status Header Card */}
          {result && (
            <div className={`p-6 rounded-2xl border shadow-md space-y-4 transition-all ${
              result.risk_level_stressed === 'Critical Risk'
                ? 'bg-gradient-to-r from-red-950 via-slate-900 to-red-900 text-white border-red-800'
                : result.risk_level_stressed === 'High Risk'
                ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white border-amber-800'
                : 'bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white border-slate-800'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Digital Twin Risk Evaluation</div>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    BASELINE ({result.risk_level_baseline}) → STRESSED ({result.risk_level_stressed})
                  </h3>
                </div>

                <div className={`px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 ${
                  result.risk_level_stressed === 'Critical Risk' || result.risk_level_stressed === 'High Risk'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {result.risk_level_stressed === 'Critical Risk' ? <AlertOctagon className="w-4 h-4 text-red-400" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  <span>{result.stressed_suitability} Under Stress</span>
                </div>
              </div>

              {/* Failure Mechanisms List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Identified Physical Failure Mechanisms
                </div>
                <div className="space-y-2">
                  {result.critical_failure_mechanisms.map((mech, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 leading-relaxed flex items-start space-x-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{mech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Mitigation Action */}
              <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-600/80 text-xs space-y-1">
                <span className="font-bold text-blue-300 block">Recommended Engineering Mitigation:</span>
                <p className="text-slate-200 leading-relaxed">{result.recommended_mitigation_action}</p>
              </div>
            </div>
          )}

          {/* Quality Retention Kinetics Chart (Recharts) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  <span>Quality Retention Kinetics Over Time (Days)</span>
                </h3>
                <p className="text-xs text-slate-500">Comparing Baseline journey quality vs Stressed journey decay</p>
              </div>
              <div className="text-xs font-mono text-slate-500 font-semibold">
                Delta Risk Score: {result?.risk_score_delta} pts
              </div>
            </div>

            {result && result.quality_retention_curve && (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.quality_retention_curve} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" label={{ value: 'Transit Days', position: 'insideBottom', offset: -5 }} stroke="#64748b" fontSize={11} />
                    <YAxis label={{ value: 'Quality %', angle: -90, position: 'insideLeft' }} stroke="#64748b" fontSize={11} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '11px', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="baseline_quality_pct" name="Baseline Journey Quality %" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="stressed_quality_pct" name="Stressed Journey Quality %" stroke="#dc2626" strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decision-Support Validation Notice Callout */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Scientific Decision-Support Validation Notice</span>
          <p className="text-amber-800 mt-0.5">
            Stress-test results are decision-support outputs generated by thermodynamic Arrhenius transmission models. 
            Final packaging selection requires appropriate technical and laboratory validation under representative real-world transport conditions.
          </p>
        </div>
      </div>
    </div>
  );
};
