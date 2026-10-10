import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'landing': return 'Home Overview';
      case 'dashboard': return 'Executive Dashboard';
      case 'new-assessment': return 'New Packaging Assessment Wizard';
      case 'recommendation': return 'Packaging Recommendation & Explanation';
      case 'stress-test': return 'Journey Stress Test — Packaging Digital Twin';
      case 'knowledge-base': return 'Scientific Knowledge Base & Evidence Ledger';
      case 'materials': return 'Packaging Materials Candidate Catalog';
      case 'history': return 'Assessment History & Log';
      case 'methodology': return 'FOOD2PACK Architecture & Methodology';
      default: return 'FOOD2PACK';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {getTabTitle()}
          </h2>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            SIH26236 — Agriculture, FoodTech & Rural Development
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Quick action pill */}
        <button
          onClick={() => setActiveTab('new-assessment')}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors border border-blue-200/80"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>New Assessment</span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-mono rounded-md border border-slate-200 font-medium">
            Team 155684
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md border border-emerald-200/80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Prototype v1.0
          </span>
        </div>
      </div>
    </header>
  );
};
