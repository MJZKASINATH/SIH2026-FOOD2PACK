import React, { useState } from 'react';
import {
  Award, CheckCircle2, ShieldCheck, Activity, Sparkles,
  ChevronDown, ChevronUp, Download, Layers
} from 'lucide-react';
import type { PackagingRecommendation } from '../types';

interface RecommendationPageProps {
  recommendation: PackagingRecommendation | null;
  onOpenStressTest: () => void;
  onNewAssessment: () => void;
}

export const RecommendationPage: React.FC<RecommendationPageProps> = ({
  recommendation,
  onOpenStressTest,
  onNewAssessment
}) => {
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);

  if (!recommendation) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-xs space-y-4 max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">No Active Recommendation</h2>
        <p className="text-xs text-slate-500">Run a new packaging assessment to view scientifically evaluated recommendation options.</p>
        <button
          onClick={onNewAssessment}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
        >
          Start New Assessment
        </button>
      </div>
    );
  }

  const mat = recommendation.recommended_material;

  const toggleEvidence = (id: string) => {
    setExpandedEvidence(expandedEvidence === id ? null : id);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recommendation, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `FOOD2PACK_Recommendation_${recommendation.assessment_id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {recommendation.assessment_id}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {recommendation.model_type}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            PACKAGING RECOMMENDATION
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (JSON)</span>
          </button>

          <button
            onClick={onOpenStressTest}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
          >
            <Activity className="w-4 h-4" />
            <span>Run Journey Stress Test</span>
          </button>
        </div>
      </div>

      {/* Main Recommended Structure Hero Card */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Top Candidate Recommendation</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{mat.name}</h2>
            <p className="text-xs text-slate-300 font-mono">Structure: {mat.structure}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{recommendation.suitability_tier}</span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{recommendation.evidence_confidence}</span>
            </div>
          </div>
        </div>

        {/* Multi-Objective Utility Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Protection Score</div>
            <div className="text-2xl font-bold text-blue-400 mt-1 font-mono">{recommendation.protection_score}<span className="text-xs text-slate-400">/100</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5">Barrier & gas match</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Cost Efficiency</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{recommendation.cost_score}<span className="text-xs text-slate-400">/100</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5">Index: {mat.cost_index}x</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Sustainability</div>
            <div className="text-2xl font-bold text-purple-400 mt-1 font-mono">{recommendation.sustainability_score}<span className="text-xs text-slate-400">/100</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5">Eco score: {mat.sustainability_score}/10</div>
          </div>

          <div className="p-4 rounded-xl bg-blue-900/60 border border-blue-600/80">
            <div className="text-[11px] font-semibold text-blue-200 uppercase">Overall Utility</div>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono">{recommendation.overall_utility_score}</div>
            <div className="text-[10px] text-blue-300 mt-0.5">Pareto optimal</div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Technical Transmission & Material Specifications</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Film Thickness</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{recommendation.specifications.thickness}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative group">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block flex items-center justify-between">
              <span>OTR Rate</span>
              <span className="text-[9px] text-blue-600 cursor-help underline">info</span>
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono">{recommendation.specifications.otr}</span>
            <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-lg z-20">
              Oxygen Transmission Rate (OTR) in cc/m²/24h/atm measured under ASTM D3985.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative group">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block flex items-center justify-between">
              <span>WVTR Rate</span>
              <span className="text-[9px] text-blue-600 cursor-help underline">info</span>
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono">{recommendation.specifications.wvtr}</span>
            <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-lg z-20">
              Water Vapour Transmission Rate (WVTR) in g/m²/24h under ASTM F1249.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Seal Integrity</span>
            <span className="text-sm font-bold text-slate-900">{recommendation.specifications.sealability}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Thermal Range</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{recommendation.specifications.temp_range}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Gas Exchange</span>
            <span className="text-sm font-bold text-emerald-700">{recommendation.specifications.gas_exchange}</span>
          </div>
        </div>
      </div>

      {/* WHY THIS RECOMMENDATION? Explanation Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>WHY THIS RECOMMENDATION?</span>
          </h3>
          <p className="text-xs text-slate-500">Structured scientific justification breakdown</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendation.explanations.map((exp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-100 text-blue-800 border border-blue-200">
                  {exp.category}
                </span>
                <span className={`text-[10px] font-bold ${
                  exp.impact === 'High' ? 'text-blue-700' : 'text-slate-600'
                }`}>
                  Impact: {exp.impact}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">{exp.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{exp.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UNIQUE COMPONENT: EVIDENCE PASSPORT */}
      <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 p-6 shadow-lg space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white tracking-tight">EVIDENCE PASSPORT</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-600 text-white rounded">
                FOOD2PACK Exclusive
              </span>
            </div>
            <p className="text-xs text-slate-400">Traceable scientific literature, physical database parameters, and regulatory standards</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{recommendation.evidence_passport.length} Cited Records</span>
        </div>

        <div className="space-y-3">
          {recommendation.evidence_passport.map((record) => {
            const isExpanded = expandedEvidence === record.id;
            return (
              <div key={record.id} className="bg-slate-800/80 rounded-xl border border-slate-700/80 overflow-hidden transition-colors">
                <div 
                  onClick={() => toggleEvidence(record.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-750"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-slate-700 text-blue-300 border border-slate-600">
                      {record.id}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{record.name}</h4>
                      <p className="text-[11px] text-slate-400">{record.category} • Source: {record.source}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">
                      {record.confidence} Confidence
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 bg-slate-950/60 border-t border-slate-700/60 text-xs space-y-2 font-mono">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Tested Property:</span>
                        <span className="text-slate-200 font-semibold">{record.property}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Measured Value:</span>
                        <span className="text-emerald-400 font-semibold">{record.value} ({record.unit})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Test Conditions:</span>
                        <span className="text-slate-200">{record.conditions}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Last Reviewed:</span>
                        <span className="text-slate-400">{record.last_updated}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-slate-300 text-[11px] font-sans">
                      <span className="font-bold text-blue-400">Scientific Applicability: </span>
                      {record.applicability_note}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Score Comparison Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Evaluated Packaging Candidates Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Candidate Material</th>
                <th className="py-2.5 px-3">Protection</th>
                <th className="py-2.5 px-3">Cost</th>
                <th className="py-2.5 px-3">Sustainability</th>
                <th className="py-2.5 px-3 text-right">Overall Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {recommendation.candidate_scores.map((cand, i) => (
                <tr key={cand.id} className={i === 0 ? 'bg-blue-50/50 font-semibold' : ''}>
                  <td className="py-3 px-3 font-sans text-slate-900 flex items-center space-x-2">
                    {i === 0 && <Award className="w-4 h-4 text-blue-600 shrink-0" />}
                    <span>{cand.name}</span>
                  </td>
                  <td className="py-3 px-3 text-blue-700">{cand.protection}/100</td>
                  <td className="py-3 px-3 text-emerald-700">{cand.cost}/100</td>
                  <td className="py-3 px-3 text-purple-700">{cand.sustainability}/100</td>
                  <td className="py-3 px-3 text-right font-extrabold text-slate-900">{cand.overall}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
