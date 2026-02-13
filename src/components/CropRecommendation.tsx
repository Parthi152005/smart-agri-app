import React, { useState } from 'react';
import { Sprout, Loader2, Droplets, Thermometer, Wind, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { classifyCrop, type PredictionResult } from '../utils/knnModel';
import { type TrainingExample } from '../data/cropTrainingSet';
import axios from 'axios';

export const CropRecommendation = () => {
    const [formData, setFormData] = useState<Omit<TrainingExample, 'label'>>({
        N: 90,
        P: 42,
        K: 43,
        temperature: 20,
        humidity: 82,
        ph: 6.5,
        rainfall: 202
    });

    const [loading, setLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<PredictionResult[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: parseFloat(e.target.value) || 0
        });
    };

    const fetchWeather = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setWeatherLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain`);

                const current = response.data.current;
                setFormData(prev => ({
                    ...prev,
                    temperature: current.temperature_2m,
                    humidity: current.relative_humidity_2m,
                    // OpenMeteo gives current rain in mm. We might want annual, but for demo current/recent is okay
                    // Or we just mock a realistic annual rainfall based on the current rain * 100 for demo purposes if it's raining, else default to a region average
                    rainfall: current.rain > 0 ? current.rain * 100 : prev.rainfall
                }));
            } catch (error) {
                console.error("Error fetching weather:", error);
                alert("Failed to fetch weather data.");
            } finally {
                setWeatherLoading(false);
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            setWeatherLoading(false);
            alert("Unable to retrieve your location.");
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // Use KNN Algorithm with K=5
            const results = classifyCrop(formData, 5);
            setRecommendations(results);
            setLoading(false);

            if (results.length > 0) {
                // Auto speak the top recommendation
                speak(`Based on K-Nearest Neighbors analysis, I recommend growing ${results[0].crop}. Prediction confidence is ${results[0].confidence} percent.`);
            }
        }, 1500);
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop previous
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to set a Tamil voice if available, else default
            // const voices = window.speechSynthesis.getVoices();
            // const tamilVoice = voices.find(voice => voice.lang.includes('ta'));
            // The crop names often have Tamil in brackets, so a Tamil voice would be cool, 
            // but for the English intro text, mixing might be tricky. 
            // Let's stick to default or a clear English voice for now to be safe, 
            // as the text passed here is English.

            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-8 bg-emerald-600 dark:bg-emerald-900 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Sprout className="w-6 h-6" /> Find Your Crop (KNN AI)
                        </h3>
                        <p className="text-emerald-100 opacity-90 mt-1">Enter soil data. The AI will find the 5 nearest neighbors to predict the crop.</p>
                    </div>
                    <button
                        onClick={fetchWeather}
                        disabled={weatherLoading}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {weatherLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wind className="w-4 h-4" />}
                        {weatherLoading ? "Fetching..." : "Auto-fill Weather"}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Soil Nutrients Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Sprout className="w-4 h-4" /> Soil Nutrients
                        </h4>
                        <div className="grid grid-cols-3 gap-6">
                            <InputField label="Nitrogen (N)" name="N" value={formData.N} onChange={handleInputChange} color="blue" />
                            <InputField label="Phosphorus (P)" name="P" value={formData.P} onChange={handleInputChange} color="purple" />
                            <InputField label="Potassium (K)" name="K" value={formData.K} onChange={handleInputChange} color="orange" />
                        </div>
                    </div>

                    {/* Environmental Factors Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Wind className="w-4 h-4" /> Environment
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                            <InputField label="Temperature (°C)" name="temperature" value={formData.temperature} onChange={handleInputChange} icon={<Thermometer className="w-4 h-4" />} color="red" />
                            <InputField label="Humidity (%)" name="humidity" value={formData.humidity} onChange={handleInputChange} icon={<Droplets className="w-4 h-4" />} color="cyan" />
                            <InputField label="pH Level" name="ph" value={formData.ph} onChange={handleInputChange} step={0.1} color="green" />
                            <InputField label="Rainfall (mm)" name="rainfall" value={formData.rainfall} onChange={handleInputChange} icon={<Wind className="w-4 h-4" />} color="indigo" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Running KNN Algorithm...
                            </>
                        ) : (
                            <>
                                Predict Crop (K=5)
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
                <AnimatePresence mode="wait">
                    {recommendations.length > 0 ? (
                        <div className="space-y-6">
                            <button
                                onClick={() => speak(`I recommend growing ${recommendations[0].crop}. It has ${recommendations[0].confidence} percent confidence.`)}
                                className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                <Volume2 className="w-4 h-4" /> Listen to Recommendation
                            </button>

                            {recommendations.map((result, index) => (
                                <motion.div
                                    key={result.crop}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-6 rounded-2xl border transition-all ${index === 0 ? 'bg-white dark:bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl' : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                {index === 0 && <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-bold">Top Prediction</span>}
                                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{result.crop}</h3>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Confidence:</span>
                                                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500" style={{ width: `${result.confidence}%` }}></div>
                                                    </div>
                                                    <span className="font-bold text-sm text-emerald-600">{result.confidence}%</span>
                                                </div>
                                                <p className="text-xs text-slate-500">
                                                    Nearest Neighbors found: {result.neighbors.length}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-full">
                                            <Sprout className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <div
                                className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800"
                            >
                                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Algorithm Insight</h4>
                                <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed">
                                    The K-Nearest Neighbors (KNN) algorithm calculated the Euclidean distance between your input and the training dataset.
                                    The top prediction, <strong>{recommendations[0].crop}</strong>, had the most occurrences among the 5 nearest data points.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                <Sprout className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Recommendations Yet</h3>
                            <p className="max-w-md">Fill out the form to run the KNN Machine Learning algorithm on your soil data.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, icon, color = "emerald", type = "number", step }: any) => {
    const colorClasses = {
        blue: "focus:ring-blue-500",
        purple: "focus:ring-purple-500",
        orange: "focus:ring-orange-500",
        red: "focus:ring-red-500",
        cyan: "focus:ring-cyan-500",
        green: "focus:ring-green-500",
        indigo: "focus:ring-indigo-500",
        emerald: "focus:ring-emerald-500",
    };

    return (
        <div className="relative group">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    step={step}
                    className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:ring-2 transition-all ${colorClasses[color as keyof typeof colorClasses] || "focus:ring-emerald-500"}`}
                />
                {icon && <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">{icon}</div>}
            </div>
        </div>
    );
};
