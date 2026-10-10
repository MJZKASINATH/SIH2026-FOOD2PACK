import React, { useState, useEffect } from 'react';
import { Check, ArrowRightLeft } from 'lucide-react';
import { fetchMaterials } from '../api';
import type { PackagingMaterialSpec } from '../types';

export const PackagingMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<PackagingMaterialSpec[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showComparisonDrawer, setShowComparisonDrawer] = useState<boolean>(false);

  useEffect(() => {
    fetchMaterials().then(setMaterials);
  }, []);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert("Select up to 3 packaging materials for side-by-side comparison.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedMaterials = materials.filter(m => selectedIds.includes(m.id));

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            PACKAGING MATERIALS CATALOG
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Candidate polymer structures, transmission profiles, and barrier capabilities
          </p>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={() => setShowComparisonDrawer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Compare {selectedIds.length} Selected Materials</span>
          </button>
        )}
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((mat) => {
          const isSelected = selectedIds.includes(mat.id);
          return (
            <div
              key={mat.id}
              className={`bg-white rounded-xl border p-6 shadow-xs space-y-4 transition-all relative ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400">{mat.id}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-0.5">{mat.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Structure: {mat.structure}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSelect(mat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{isSelected ? 'Selected' : 'Compare'}</span>
                </button>
              </div>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Thickness</span>
                  <span className="font-mono font-bold text-slate-900">{mat.thickness_microns} µm</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">OTR Rate</span>
                  <span className="font-mono font-bold text-slate-900">{mat.otr_cc_m2_day_atm} cc</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">WVTR Rate</span>
                  <span className="font-mono font-bold text-slate-900">{mat.wvtr_g_m2_day} g</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Gas Exchange</span>
                  <span className={`font-semibold ${mat.gas_exchange_capable ? 'text-emerald-600' : 'text-slate-600'}`}>
                    {mat.gas_exchange_capable ? 'Breathable' : 'Hermetic'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500">
                  Cost Index: <strong className="text-slate-800">{mat.cost_index}x</strong>
                </span>
                <span className="text-slate-500">
                  Sustainability: <strong className="text-emerald-700">{mat.sustainability_score}/10</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Modal / Drawer */}
      {showComparisonDrawer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Side-by-Side Packaging Comparison</h3>
                <p className="text-xs text-slate-500">Comparing technical transmission and economic metrics</p>
              </div>
              <button
                onClick={() => setShowComparisonDrawer(false)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg"
              >
                Close
              </button>
            </div>

            {selectedMaterials.length === 0 ? (
              <p className="text-xs text-slate-500">No materials selected. Select items from catalog first.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-sans">Specification</th>
                      {selectedMaterials.map(m => (
                        <th key={m.id} className="py-3 px-4 text-blue-700 font-sans">{m.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">Structure</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4">{m.structure}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">Thickness</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4">{m.thickness_microns} µm</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">OTR Rate</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4">{m.otr_cc_m2_day_atm} cc/m²/24h</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">WVTR Rate</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4">{m.wvtr_g_m2_day} g/m²/24h</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">Sealability</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4">{m.sealability_rating}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">Cost Index</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4">{m.cost_index}x</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-700">Sustainability Score</td>
                      {selectedMaterials.map(m => <td key={m.id} className="py-3 px-4 font-bold text-emerald-600">{m.sustainability_score}/10</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
