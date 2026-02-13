import React, { useState, useRef } from 'react';
// import { Upload, Scan, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Upload, Scan, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const soilTypes = [
    { name: 'Clay', description: 'Heavy, nutrient-rich soil that holds water well but drains slowly.', nutrients: { N: 'High', P: 'Medium', K: 'High' }, ph: '5.5 - 7.0' },
    { name: 'Sandy', description: 'Light, warm, dry and tends to be acidic and low in nutrients.', nutrients: { N: 'Low', P: 'Low', K: 'Low' }, ph: '5.5 - 6.5' },
    { name: 'Loamy', description: 'Ideal blend of sand, silt and clay. Fertile and well-draining.', nutrients: { N: 'Balanced', P: 'Balanced', K: 'Balanced' }, ph: '6.0 - 7.5' },
    { name: 'Silt', description: 'Fertile, light soil that retains moisture well but compacts easily.', nutrients: { N: 'Medium', P: 'Medium', K: 'Medium' }, ph: '6.0 - 7.0' },
    { name: 'Peaty', description: 'High in organic matter, retains moisture, and can be acidic.', nutrients: { N: 'High', P: 'Low', K: 'Low' }, ph: '3.0 - 5.5' },
];

export const SoilAnalysis = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<typeof soilTypes[number] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setResult(null);
        }
    };

    const analyzeSoil = () => {
        if (!file) return;
        setAnalyzing(true);
        // Simulate AI processing
        setTimeout(() => {
            const randomSoil = soilTypes[Math.floor(Math.random() * soilTypes.length)];
            setResult(randomSoil);
            setAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/50">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-400 flex items-center gap-2">
                    <Scan className="w-5 h-5" /> AI Soil Analysis
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">Upload an image of your soil to get instant insights.</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Upload Area */}
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative ${file ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="empty">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 font-medium">Click to upload or drag and drop</p>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="selected">
                                {analyzing ? (
                                    <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                        <motion.div
                                            className="absolute inset-0 border-4 border-green-200 dark:border-green-900 rounded-full"
                                        />
                                        <motion.div
                                            className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        />
                                        <Scan className="text-green-600 dark:text-green-400 w-10 h-10 animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                                            {/* Image Preview */}
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                                                <div className="bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span className="text-sm font-medium">{file.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!analyzing && !result && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); analyzeSoil(); }}
                                        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-green-500/20 flex items-center gap-2 mx-auto"
                                    >
                                        <Scan className="w-5 h-5" /> Analyze Image
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl p-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <SproutIcon size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg shadow-lg text-white">
                                        <BarChartIcon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Analysis Results</h4>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Soil Type Detected</p>
                                        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{result.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 italic">"{result.description}"</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <NutrientBadge label="Nitrogen" value={result.nutrients.N} />
                                        <NutrientBadge label="Phosphorus" value={result.nutrients.P} />
                                        <NutrientBadge label="Potassium" value={result.nutrients.K} />
                                        <NutrientBadge label="pH Level" value={result.ph} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const NutrientBadge = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50 shadow-sm backdrop-blur-sm">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{label}</p>
        <p className="font-bold text-slate-800 dark:text-emerald-300">{value}</p>
    </div>
);

// Fallback icons if lucide-react export is different or missing
const SproutIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.4-1.2-.6-2.1-1.9-2-3.3a2.94 2.94 0 0 1 .8-2c1.3-1.3 3-1 3.7-.8" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.5-3.5a2.99 2.99 0 0 0-.8-2c-1.2-1.2-2.8-1-3.6-.8" /></svg>
);

const BarChartIcon = ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
);
