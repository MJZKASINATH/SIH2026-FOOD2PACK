import React, { useState, useEffect } from 'react';
import { Database, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchEvidence } from '../api';
import type { EvidenceRecord } from '../types';

export const KnowledgeBasePage: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvidence(search, selectedCategory).then(setEvidenceList);
  }, [search, selectedCategory]);

  const categories = [
    'All',
    'Research Literature',
    'Food Property Database',
    'Packaging Material Data',
    'Regulatory Requirement'
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            SCIENTIFIC KNOWLEDGE BASE
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Searchable evidence ledger for food properties, transmission rates, and regulatory safety limits
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-semibold rounded-md border border-blue-200">
          {evidenceList.length} Traceable Records
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search food, OTR, transpiration, FSSAI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Cards List */}
      <div className="space-y-4">
        {evidenceList.map((record) => {
          const isExpanded = expandedId === record.id;
          return (
            <div key={record.id} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-all">
              <div 
                onClick={() => setExpandedId(isExpanded ? null : record.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0 mt-0.5">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-400">{record.id}</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {record.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-0.5">{record.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Source: {record.source}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-blue-700">{record.value}</div>
                    <div className="text-[10px] text-slate-400">{record.unit} • {record.conditions}</div>
                  </div>
                  <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded border border-emerald-200 shrink-0">
                    {record.confidence} Confidence
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="font-bold text-slate-700 block">Tested Property:</span>
                      <span className="text-slate-900">{record.property}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">Test Conditions:</span>
                      <span className="text-slate-900">{record.conditions}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">Last Reviewed:</span>
                      <span className="text-slate-900">{record.last_updated}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-blue-900 block mb-1">Scientific Applicability Note:</span>
                    <p className="text-slate-700 leading-relaxed">{record.applicability_note}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
