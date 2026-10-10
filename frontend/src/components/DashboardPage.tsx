import React, { useEffect, useState } from 'react';
import {
  Sparkles, PlusCircle, Database, Activity, Award, ArrowRight,
  CheckCircle, FileText, ChevronRight
} from 'lucide-react';
import { fetchAssessmentHistory } from '../api';
import type { AssessmentHistoryItem } from '../types';

interface DashboardPageProps {
  onStartAssessment: (commodity?: string) => void;
  onViewRecommendation: () => void;
  onOpenStressTest: () => void;
  onOpenKnowledgeBase: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onStartAssessment,
  onViewRecommendation,
  onOpenStressTest
}) => {
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessmentHistory().then((data) => {
      setHistory(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome to FOOD<span className="text-blue-600">2</span>PACK
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            AI-Based Intelligent Food Packaging Decision-Support Dashboard
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStartAssessment()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Packaging Assessment</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assessments</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {history.filter(h => !h.is_demo).length} <span className="text-xs text-slate-400 font-normal">(+2 Demo)</span>
            </div>
            <div className="text-[11px] text-slate-400">Total sessions</div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recommendations</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {history.length} <span className="text-xs text-emerald-600 font-normal">Active</span>
            </div>
            <div className="text-[11px] text-slate-400">Multi-objective decision</div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stress Tests</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              Digital Twin
            </div>
            <div className="text-[11px] text-slate-400">What-if simulation</div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Evidence Records</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              5 <span className="text-xs text-purple-600 font-normal">Curated</span>
            </div>
            <div className="text-[11px] text-slate-400">Literature & Datasheets</div>
          </div>
        </div>
      </div>

      {/* Main Action Card */}
      <div className="p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Evaluation Workflow</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Start a New Packaging Assessment</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Enter the food commodity profile and journey conditions to evaluate packaging candidates using scientific gas-exchange constraints and multi-objective optimization.
          </p>
        </div>

        <button
          onClick={() => onStartAssessment()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 shrink-0 transition-all hover:scale-105"
        >
          <span>Start Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Commodity Demo Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
          Quick Launch Demo Commodity Profiles
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: "Tomato", badge: "Primary Demo", color: "bg-red-50 text-red-700 border-red-200" },
            { name: "Apple", badge: "Moderate Resp.", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { name: "Mango", badge: "Active Resp.", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { name: "Grains", badge: "Non-respiring", color: "bg-amber-100/50 text-amber-800 border-amber-300" }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => onStartAssessment(item.name)}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded border ${item.color} mb-2`}>
                  {item.badge}
                </span>
                <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-blue-600 font-semibold pt-2 border-t border-slate-100">
                <span>Evaluate Now</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Assessments Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recent Assessments</h3>
            <p className="text-xs text-slate-500">Historical packaging evaluation logs</p>
          </div>
          <button
            onClick={onViewRecommendation}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View Recommendation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading history...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Assessment ID</th>
                  <th className="py-3 px-4">Commodity</th>
                  <th className="py-3 px-4">Journey Parameters</th>
                  <th className="py-3 px-4">Recommended Material</th>
                  <th className="py-3 px-4">Suitability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900 flex items-center space-x-2">
                      <span>{item.id}</span>
                      {item.is_demo && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-slate-100 text-slate-600 font-bold rounded border border-slate-200">
                          Demo
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{item.commodity}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{item.journey}</td>
                    <td className="py-3 px-4 font-medium text-slate-900 max-w-xs truncate">
                      {item.recommended_material}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                        {item.suitability}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={onViewRecommendation}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-semibold transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={onOpenStressTest}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-semibold border border-indigo-200 transition-colors"
                      >
                        Stress Test
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
