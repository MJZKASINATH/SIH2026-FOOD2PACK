import React from 'react';
import {
  LayoutDashboard, PlusCircle, Award, Activity, Database, Boxes, History, BookOpen,
  Info, ShieldAlert, PackageCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAbout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenAbout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-assessment', label: 'New Assessment', icon: PlusCircle },
    { id: 'recommendation', label: 'Recommendations', icon: Award },
    { id: 'stress-test', label: 'Journey Stress Test', icon: Activity, badge: 'Hero' },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: Database },
    { id: 'materials', label: 'Packaging Materials', icon: Boxes },
    { id: 'history', label: 'Assessment History', icon: History },
    { id: 'methodology', label: 'Methodology', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0 border-r border-slate-800 select-none shadow-xl z-30">
      {/* Brand Logo & Header */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-950/40">
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <PackageCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              FOOD<span className="text-blue-400">2</span>PACK
            </h1>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">Packaging Intelligence</p>
          </div>
        </div>

        <div className="mt-3 px-2.5 py-1 bg-slate-800/80 rounded-md border border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300 font-mono">
          <span>SIH26236</span>
          <span className="text-blue-400 font-semibold">Team TrustUs</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded ${
                  isActive ? 'bg-blue-800 text-blue-100' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 space-y-2">
        <button
          onClick={onOpenAbout}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Info className="w-4 h-4 text-slate-400" />
          <span>About FOOD2PACK</span>
        </button>

        <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300 leading-tight flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">Validation Notice</p>
            <p className="text-[10px] text-amber-300/80 mt-0.5">Decision-support system. Final selection requires lab validation.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
