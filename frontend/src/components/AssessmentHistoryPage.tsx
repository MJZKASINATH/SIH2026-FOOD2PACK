import React, { useEffect, useState } from 'react';
import { CheckCircle, Activity, Eye } from 'lucide-react';
import { fetchAssessmentHistory } from '../api';
import type { AssessmentHistoryItem } from '../types';

interface AssessmentHistoryPageProps {
  onViewRecommendation: () => void;
  onOpenStressTest: () => void;
}

export const AssessmentHistoryPage: React.FC<AssessmentHistoryPageProps> = ({
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
    <div className="space-y-6 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ASSESSMENT HISTORY & LOGS
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Historical audit log of packaging evaluation sessions
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-semibold rounded-md border border-blue-200">
          {history.length} Saved Records
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading history...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">Assessment ID</th>
                  <th className="py-3 px-4">Food Commodity</th>
                  <th className="py-3 px-4">Journey Profile</th>
                  <th className="py-3 px-4">Assigned Material</th>
                  <th className="py-3 px-4">Suitability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{item.timestamp}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900 flex items-center space-x-2">
                      <span>{item.id}</span>
                      {item.is_demo && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-slate-100 text-slate-600 font-bold rounded border border-slate-200">
                          Demo
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">{item.commodity}</td>
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
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={onOpenStressTest}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-semibold border border-indigo-200 transition-colors inline-flex items-center gap-1"
                      >
                        <Activity className="w-3 h-3" />
                        <span>Stress Test</span>
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
