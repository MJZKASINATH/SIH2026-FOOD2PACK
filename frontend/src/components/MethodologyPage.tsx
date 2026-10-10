import React from 'react';
import { BookOpen, ShieldAlert, Cpu, Layers, Database, Activity, Award, Sliders } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const stages = [
    {
      num: 1,
      title: "FOOD FINGERPRINT",
      desc: "Constructs multi-dimensional food physical profile (Moisture %, Fat %, pH, respiration dynamics, transpiration constant).",
      icon: Database
    },
    {
      num: 2,
      title: "JOURNEY PROFILE",
      desc: "Captures transit environmental stresses (Temperature °C, Relative Humidity %, Duration hours, Storage regime, Transport mode).",
      icon: Layers
    },
    {
      num: 3,
      title: "EVIDENCE ENGINE",
      desc: "Queries peer-reviewed postharvest science, polymer datasheets, and regulatory standards to retrieve hard physical constraints.",
      icon: BookOpen
    },
    {
      num: 4,
      title: "SCIENTIFIC CONSTRAINTS",
      desc: "Evaluates mandatory boundary conditions (Gas exchange matching, moisture migration thresholds, thermal polymer limits).",
      icon: ShieldAlert
    },
    {
      num: 5,
      title: "PREDICTIVE ML",
      desc: "Runs prototype prediction model to evaluate candidate packaging performance scores and confidence bounds.",
      icon: Cpu
    },
    {
      num: 6,
      title: "MULTI-OBJECTIVE OPTIMIZATION",
      desc: "Solves pareto trade-offs across Protection, Cost, Material Efficiency, and Environmental Sustainability based on user preference weights.",
      icon: Sliders
    },
    {
      num: 7,
      title: "EXPLAINABLE RECOMMENDATION",
      desc: "Generates transparent, scientifically-justified reasoning cards and attaches an Evidence Passport for peer auditing.",
      icon: Award
    },
    {
      num: 8,
      title: "JOURNEY STRESS TEST",
      desc: "Packaging Digital Twin simulator: Recalculates risk kinetics and quality decay curves under thermal abuse or transit delays.",
      icon: Activity
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          SYSTEM ARCHITECTURE & METHODOLOGY
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Detailed breakdown of the 8-stage decision-support pipeline
        </p>
      </div>

      {/* Principle Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md">
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Scientific Core Principle</div>
        <p className="text-xl font-mono font-bold text-blue-200">
          "AI proposes. Scientific constraints protect. Evidence validates."
        </p>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          FOOD2PACK ensures that artificial intelligence outputs are bounded by physical food-science constraints and verified against peer-reviewed postharvest literature.
        </p>
      </div>

      {/* 8-Stage Pipeline Flow Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">The 8 Decision Pipeline Stages</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.num} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3 relative hover:border-blue-400 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono text-xs border border-blue-100">
                    0{st.num}
                  </div>
                  <Icon className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scientific Notice & Disclaimers */}
      <div className="p-6 bg-amber-50/80 rounded-2xl border border-amber-200/90 text-amber-950 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-sm text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>Product Positioning & Decision-Support Notice</span>
        </div>
        <p className="text-xs text-amber-900/90 leading-relaxed max-w-4xl">
          FOOD2PACK is an AI-based food packaging decision-support system. It does not replace physical laboratory testing, expert packaging validation, or regulatory approval. 
          Prototype models are clearly labeled. Final packaging selection requires technical and laboratory validation.
        </p>
      </div>
    </div>
  );
};
