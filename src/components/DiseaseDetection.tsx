import React, { useState, useRef } from 'react';
import { Upload, Scan, CheckCircle2, FileWarning, Search, Microscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const diseases = [
    { name: 'Leaf Blight (இலை கருகல்)', description: 'Fungal disease causing browning of leaves.', remedy: 'Apply Copper Oxychloride spray.' },
    { name: 'Rust (துரு நோய்)', description: 'Reddish-brown pustules on leaves.', remedy: 'Use Sulphur-based fungicides.' },
    { name: 'Powdery Mildew (சாம்பல் நோய்)', description: 'White powdery spots on leaves and stems.', remedy: 'Spray Neem oil or Karathane.' },
    { name: 'Healthy (ஆரோக்கியமானது)', description: 'No disease detected. Keep maintaining regular care.', remedy: 'Continue monitoring water and nutrient levels.' }
];

export const DiseaseDetection = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<typeof diseases[number] | null>(null);
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

    const analyzeDisease = () => {
        if (!file) return;
        setAnalyzing(true);
        // Simulate AI processing
        setTimeout(() => {
            const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
            setResult(randomDisease);
            setAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border-b border-rose-100 dark:border-rose-800/50">
                <h3 className="text-xl font-bold text-rose-900 dark:text-rose-400 flex items-center gap-2">
                    <Microscope className="w-6 h-6" /> AI Plant Disease Detection
                </h3>
                <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">Upload a photo of a sick leaf for instant diagnosis.</p>
            </div>

            <div className="p-6 space-y-6">
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative ${file ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/10' : 'border-slate-300 dark:border-slate-600 hover:border-rose-400 dark:hover:border-rose-500 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="empty">
                                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600 dark:text-rose-400">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 font-medium">Click to upload leaf photo</p>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="selected">
                                {analyzing ? (
                                    <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                        <motion.div
                                            className="absolute inset-0 border-4 border-rose-200 dark:border-rose-900 rounded-full"
                                        />
                                        <motion.div
                                            className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        />
                                        <Search className="text-rose-600 dark:text-rose-400 w-10 h-10 animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
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
                                        onClick={(e) => { e.stopPropagation(); analyzeDisease(); }}
                                        className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-rose-500/20 flex items-center gap-2 mx-auto"
                                    >
                                        <Scan className="w-5 h-5" /> Diagnose Issue
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`rounded-xl p-6 relative overflow-hidden border ${result.name.includes('Healthy') ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}
                        >
                            <h4 className={`text-2xl font-bold mb-2 ${result.name.includes('Healthy') ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                {result.name}
                            </h4>
                            <p className="text-slate-700 dark:text-slate-300 mb-4">{result.description}</p>

                            <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-lg">
                                <h5 className="font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                    <FileWarning className="w-4 h-4" /> Recommended Action:
                                </h5>
                                <p className="text-slate-600 dark:text-slate-400">{result.remedy}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
