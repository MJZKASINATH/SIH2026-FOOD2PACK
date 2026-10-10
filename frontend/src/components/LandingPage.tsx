import React from 'react';
import {
  ArrowRight, ShieldCheck, Thermometer, Database, Activity, Sparkles,
  Zap, TrendingUp, CheckCircle2, ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onStartAssessment: () => void;
  onExploreMethodology: () => void;
  onOpenStressTest: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onExploreMethodology,
  onOpenStressTest
}) => {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white p-8 md:p-12 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Tag / Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>SIH 2026 Problem Statement ID: SIH26236</span>
          </div>

          {/* Main Title & Tagline */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              FOOD<span className="text-blue-400">2</span>PACK
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-blue-200 mt-2">
              "Design the package for the journey, not just the product."
            </p>
          </div>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl font-normal">
            An evidence-backed decision-support system for intelligent food packaging selection using 
            food characteristics, journey conditions, scientific constraints, predictive models, and multi-objective optimization.
          </p>

          {/* Scientific Core Principle */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 max-w-2xl">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Scientific Core Principle</div>
            <p className="text-slate-100 font-mono text-sm sm:text-base font-semibold text-blue-300">
              "AI proposes. Scientific constraints protect. Evidence validates."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onStartAssessment}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Packaging Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreMethodology}
              className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <span>Explore How It Works</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Technical Pipeline Hero Visual */}
          <div className="pt-6 border-t border-slate-800/90">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Simplified Technical Decision Pipeline
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs font-medium">
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                <span className="block font-bold text-blue-400">FOOD</span>
                <span className="text-[10px] text-slate-400">Fingerprint</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                <span className="block font-bold text-indigo-400">+ JOURNEY</span>
                <span className="text-[10px] text-slate-400">Environment</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                <span className="block font-bold text-emerald-400">SCIENCE</span>
                <span className="text-[10px] text-slate-400">Evidence</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                <span className="block font-bold text-amber-400">AI / ML</span>
                <span className="text-[10px] text-slate-400">Predictive</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200">
                <span className="block font-bold text-purple-400">OPTIMIZE</span>
                <span className="text-[10px] text-slate-400">Multi-Obj</span>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-900/60 border border-blue-600/80 text-white font-bold">
                <span className="block text-blue-200">DECISION</span>
                <span className="text-[10px] text-blue-300">Explainable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Core Feature Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Core System Capabilities</h2>
          <span className="text-xs text-slate-500 font-medium">Decision-Support Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Food Fingerprint</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Considers respiration rate, transpiration dynamics, moisture %, pH, and fat content to establish physical vulnerability metrics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Journey-Aware Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates ambient temperature fluctuations, humidity exposure, transit delays, and storage regimes to match environmental realties.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Evidence-Backed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every recommendation is traceable to peer-reviewed food postharvest literature, polymer transmission datasheets, and regulatory standards.
            </p>
          </div>

          {/* Card 4 */}
          <div 
            onClick={onOpenStressTest}
            className="p-5 bg-gradient-to-br from-white to-blue-50/40 rounded-xl border border-blue-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base mb-1">Journey Stress Test</h3>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded">HERO</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive "What-If" digital twin simulator. Test how packaging suitability shifts under heat spikes or transit delays.
            </p>
          </div>
        </div>
      </section>

      {/* Why FOOD2PACK Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-lg space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Why FOOD2PACK?</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Packaging suitability is not determined by material alone. Food physical properties, environmental ambient conditions, 
            transport duration, and storage regimes dynamically change barrier requirements during transit.
          </p>
        </div>

        {/* Three Pillars: PROTECT, RESCUE, EMPOWER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* PROTECT */}
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-blue-400 tracking-wide">PROTECT</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Support better-informed packaging decisions by enforcing scientific constraint boundaries on gas transmission and moisture migration.
            </p>
          </div>

          {/* RESCUE */}
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-400 tracking-wide">RESCUE</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Identify potentially risky journey conditions before transit begins, avoiding spoilage, mass loss, and financial loss in the supply chain.
            </p>
          </div>

          {/* EMPOWER */}
          <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-emerald-400 tracking-wide">EMPOWER</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Make packaging-science decision support accessible to farmers, Farmer Producer Organizations (FPOs), MSMEs, and logistics operators.
            </p>
          </div>
        </div>
      </section>

      {/* SIH Jury Alignment Callout */}
      <div className="p-6 bg-blue-50/70 rounded-xl border border-blue-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>SIH 2026 Evaluation Ready</span>
          </div>
          <p className="text-sm font-medium text-blue-950">
            FOOD2PACK evaluates whether the package fits the journey — complete with transparent explanations and evidence passports.
          </p>
        </div>
        <button
          onClick={onStartAssessment}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shrink-0 transition-colors"
        >
          Launch Assessment
        </button>
      </div>
    </div>
  );
};
