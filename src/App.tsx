// import React, { useState } from 'react';
import Layout from './components/Layout';
// import { Hero } from './components/Hero'; 
import { SoilAnalysis } from './components/SoilAnalysis';
import { CropRecommendation } from './components/CropRecommendation';
import { DiseaseDetection } from './components/DiseaseDetection';
import { FertilizerCalculator } from './components/FertilizerCalculator';

function App() {
  return (
    <Layout>
      <section id="hero" className="min-h-[60vh] flex flex-col justify-center items-center text-center space-y-8 py-20 relative px-4">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1625246333195-bf433a04918e?q=80&w=2693&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
          Smart Agriculture <span className="text-green-600 dark:text-green-400">Revolution</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Empowering farmers with AI-driven crop recommendations and soil analysis for a sustainable future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="#recommend" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-green-500/30 text-lg">
            Get Started
          </a>
          <a href="#analyze" className="px-8 py-4 bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700 hover:border-green-400 rounded-full font-semibold transition-all text-lg hover:bg-green-50 dark:hover:bg-slate-700">
            Learn More
          </a>
        </div>
      </section>

      <section id="analyze" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
              <span className="bg-green-100 dark:bg-green-900 p-2 rounded-lg text-green-600 dark:text-green-400">🌱</span>
              Soil Analysis
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Upload an image of your soil or input data manually to get instant analysis and nutrient breakdown.
            </p>
          </div>

          <SoilAnalysis />
        </div>
      </section>

      <section id="disease" className="py-20 scroll-mt-20 bg-rose-50/50 dark:bg-rose-900/5 rounded-3xl">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
              <span className="bg-rose-100 dark:bg-rose-900 p-2 rounded-lg text-rose-600 dark:text-rose-400">🔬</span>
              Plant Disease Detection
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Identify plant diseases early with our AI-powered image diagnosis tool.
            </p>
          </div>
          <DiseaseDetection />
        </div>
      </section>

      <section id="recommend" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
              <span className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">🌾</span>
              Crop Recommendation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Enter your soil parameters and environmental conditions to discover the best crops for your land.
            </p>
          </div>

          <CropRecommendation />
        </div>
      </section>

      <section id="tools" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center gap-3">
                <span className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg text-amber-600 dark:text-amber-400">🧮</span>
                Fertilizer Calculator
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Calculate exact nutrient dosages for maximum yield.
              </p>
            </div>
            <FertilizerCalculator />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;
