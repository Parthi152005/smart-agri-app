// import React, { useState } from 'react';
import { useState } from 'react';
import { Calculator, Shovel } from 'lucide-react';

export const FertilizerCalculator = () => {
    const [soilData, setSoilData] = useState({ N: 0, P: 0, K: 0 });
    const [result, setResult] = useState<{ urea: number, ssp: number, mop: number } | null>(null);

    // Simplified logic: Target - Current = Deficit -> Convert to Kg/Acre based on fertilizer content
    // Urea (46% N), SSP (16% P), MOP (60% K)
    const calculate = () => {
        // Mock target values for demo
        const target = { N: 120, P: 60, K: 60 };

        const deficitN = Math.max(0, target.N - soilData.N);
        const deficitP = Math.max(0, target.P - soilData.P);
        const deficitK = Math.max(0, target.K - soilData.K);

        setResult({
            urea: Math.round(deficitN / 0.46),
            ssp: Math.round(deficitP / 0.16),
            mop: Math.round(deficitK / 0.60)
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/50">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2">
                    <Calculator className="w-6 h-6" /> Smart Fertilizer Calculator
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">Calculate precise fertilizer dosage for your soil.</p>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Soil N</label>
                        <input type="number" className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600"
                            onChange={e => setSoilData({ ...soilData, N: +e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Soil P</label>
                        <input type="number" className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600"
                            onChange={e => setSoilData({ ...soilData, P: +e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Soil K</label>
                        <input type="number" className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600"
                            onChange={e => setSoilData({ ...soilData, K: +e.target.value })} />
                    </div>
                </div>

                <button onClick={calculate} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Shovel className="w-5 h-5" /> Calculate Dosage
                </button>

                {result && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <ResultCard label="Urea" value={`${result.urea} kg/acre`} color="blue" />
                        <ResultCard label="SSP" value={`${result.ssp} kg/acre`} color="orange" />
                        <ResultCard label="MOP" value={`${result.mop} kg/acre`} color="red" />
                    </div>
                )}
            </div>
        </div>
    );
};

const ResultCard = ({ label, value, color }: any) => (
    <div className={`p-3 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-100 dark:border-${color}-800 text-center`}>
        <p className={`text-xs font-bold text-${color}-600 dark:text-${color}-400 uppercase`}>{label}</p>
        <p className={`text-lg font-bold text-${color}-800 dark:text-${color}-200`}>{value}</p>
    </div>
);
