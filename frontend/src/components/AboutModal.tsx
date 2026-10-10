import React from 'react';
import { X, ShieldAlert, PackageCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">About FOOD2PACK</h2>
              <p className="text-xs text-slate-500 font-mono">SIH 2026 Problem Statement ID: SIH26236</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div>
              <span className="text-slate-500 block">Team ID:</span>
              <span className="font-bold text-slate-900">155684</span>
            </div>
            <div>
              <span className="text-slate-500 block">Team Name:</span>
              <span className="font-bold text-blue-700">TrustUs</span>
            </div>
            <div>
              <span className="text-slate-500 block">Theme:</span>
              <span className="text-slate-900">Agriculture, FoodTech & Rural Dev</span>
            </div>
            <div>
              <span className="text-slate-500 block">Category:</span>
              <span className="text-slate-900">Software</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Core Tagline & Principle</h3>
            <p className="font-semibold text-blue-900 text-xs">"Design the package for the journey, not just the product."</p>
            <p className="font-mono text-[11px] text-blue-700 mt-0.5">"AI proposes. Scientific constraints protect. Evidence validates."</p>
          </div>

          <p>
            FOOD2PACK is an AI-based food-packaging decision-support system created for Smart India Hackathon 2026. 
            It evaluates packaging material candidates by analyzing both food commodity characteristics and transport journey conditions.
          </p>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 space-y-1">
            <span className="font-bold text-amber-900 block flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Decision-Support System Positioning
            </span>
            <p className="text-[11px] text-amber-900/90">
              FOOD2PACK is a decision-support system. It does not replace physical laboratory testing, expert packaging validation, or regulatory approval. 
              Final packaging selection requires appropriate technical and laboratory validation under representative real-world conditions.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
