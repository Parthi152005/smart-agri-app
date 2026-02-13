import React, { useState, useRef } from 'react';
import { Upload, Scan, CheckCircle2, FileWarning, Search, Microscope, Camera, X } from 'lucide-react';
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
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
            setShowCamera(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Unable to access camera. Please allow camera permissions.");
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setShowCamera(false);
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
                        setFile(file);
                        setResult(null);
                        stopCamera();
                    }
                }, 'image/jpeg');
            }
        }
    };

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
                <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">Upload or capture a photo of a sick leaf for instant diagnosis.</p>
            </div>

            <div className="p-6 space-y-6">

                {/* Camera Modal Overlay */}
                <AnimatePresence>
                    {showCamera && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden max-w-md w-full relative">
                                <button onClick={stopCamera} className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="relative aspect-[3/4] bg-black">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 flex justify-center bg-slate-100 dark:bg-slate-800">
                                    <button
                                        onClick={takePhoto}
                                        className="w-16 h-16 rounded-full bg-white border-4 border-rose-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-rose-500" />
                                    </button>
                                </div>
                                <canvas ref={canvasRef} className="hidden" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all relative ${file ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/10' : 'border-slate-300 dark:border-slate-600 hover:border-rose-400 dark:hover:border-rose-500 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="empty">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium">Drag & Drop or Click to Upload</p>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            Choose File
                                        </button>
                                        <button
                                            onClick={startCamera}
                                            className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors flex items-center gap-2"
                                        >
                                            <Camera className="w-4 h-4" /> Open Camera
                                        </button>
                                    </div>
                                </div>
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
                                        <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden mb-4 flex items-center justify-center group">
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setFile(null)} className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-white/30">
                                                    Change Image
                                                </button>
                                            </div>
                                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                <span className="text-xs font-medium truncate max-w-[100px]">{file.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!analyzing && !result && (
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => setFile(null)}
                                            className="px-4 py-2 text-slate-500 hover:text-slate-700 text-sm font-semibold"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={analyzeDisease}
                                            className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-rose-500/20 flex items-center gap-2"
                                        >
                                            <Scan className="w-5 h-5" /> Diagnose Issue
                                        </button>
                                    </div>
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

                            <button
                                onClick={() => { setFile(null); setResult(null); }}
                                className="mt-4 w-full py-2 bg-white/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/30 rounded-lg text-sm font-semibold transition-colors"
                            >
                                Analyze Another Leaf
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
