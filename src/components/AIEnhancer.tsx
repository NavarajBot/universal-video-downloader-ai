import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Volume2, 
  Video, 
  Sun, 
  Maximize2, 
  Mic, 
  RefreshCw,
  Download,
  Layers
} from 'lucide-react';
import { AIEnhancementsConfig } from '../types';

interface AIEnhancerProps {
  isDarkMode?: boolean;
}

export const AIEnhancer: React.FC<AIEnhancerProps> = ({ isDarkMode }) => {
  const [config, setConfig] = useState<AIEnhancementsConfig>({
    upscale4K: true,
    denoise: true,
    sharpen: true,
    colorBoost: true,
    hdrEnhance: false,
    backgroundNoiseRemoval: true,
    vocalBooster: true,
    speechEnhance: false,
    fpsBoost60: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [comparisonSlider, setComparisonSlider] = useState(50);

  const toggleOption = (key: keyof AIEnhancementsConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    setIsCompleted(false);
  };

  const handleProcessEnhancements = () => {
    setIsProcessing(true);
    setIsCompleted(false);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 2000);
  };

  return (
    <div className={`p-6 rounded-3xl border shadow-xl space-y-6 transition-colors ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900 shadow-indigo-100'
    }`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Wand2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              AI Video & Audio Enhancement Studio
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Neural Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upscale resolution to 4K, remove compression noise, isolate vocals, and boost frame rates using AI.
          </p>
        </div>

        <button
          onClick={handleProcessEnhancements}
          disabled={isProcessing}
          className="py-3 px-6 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Rendering AI Neural Frames...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Apply AI Enhancements</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Interactive Visual Split Preview + Enhancement Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Before/After Interactive Comparison Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video group shadow-xl">
            {/* Base Enhanced Image */}
            <img 
              src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop" 
              alt="Enhanced 4K Preview" 
              className="w-full h-full object-cover"
            />

            {/* Split Overlay Original Image */}
            <div 
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 shadow-2xl transition-all"
              style={{ width: `${comparisonSlider}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=400&auto=format&fit=crop" 
                alt="Original SD Preview" 
                className="absolute inset-0 w-full h-full object-cover filter blur-[1px] contrast-75 brightness-90"
              />
              <span className="absolute top-3 left-3 px-2 py-1 rounded bg-slate-900/80 text-[10px] font-mono font-bold text-slate-300">
                Original SD (720p)
              </span>
            </div>

            <span className="absolute top-3 right-3 px-2 py-1 rounded bg-amber-500 text-[10px] font-mono font-bold text-white shadow-md">
              AI 4K Upscaled + Denoised
            </span>

            {/* Interactive Slider Overlay Handle */}
            <div className="absolute inset-x-0 bottom-4 px-6 flex items-center justify-between text-xs text-white bg-slate-950/70 backdrop-blur-md py-2 mx-4 rounded-xl">
              <span className="font-semibold text-[11px]">Slide to Compare:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={comparisonSlider}
                onChange={(e) => setComparisonSlider(Number(e.target.value))}
                className="w-48 accent-amber-500 cursor-pointer"
              />
              <span className="font-mono font-bold text-amber-400">{comparisonSlider}% Split</span>
            </div>
          </div>

          {isCompleted && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                AI Neural Rendering Complete! Output resolution upscaled to 3840x2160 @ 60fps.
              </span>
              <button 
                onClick={() => alert('Enhanced 4K Master Video File download triggered.')}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <Download className="w-3.5 h-3.5" /> Download 4K Master
              </button>
            </div>
          )}
        </div>

        {/* Right: Enhancement Toggles */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500" />
            Neural Enhancement Parameters:
          </h3>

          <div className="space-y-2 text-xs">
            {/* Upscale 4K */}
            <button
              onClick={() => toggleOption('upscale4K')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                config.upscale4K 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Maximize2 className="w-4 h-4" />
                <div>
                  <span className="block font-bold">4K Neural Upscaling</span>
                  <span className="text-[10px] text-slate-400 font-normal">Reconstruct missing micro-textures & edge clarity</span>
                </div>
              </div>
              <input type="checkbox" checked={config.upscale4K} onChange={() => {}} className="accent-amber-500" />
            </button>

            {/* Denoise & Sharpen */}
            <button
              onClick={() => toggleOption('denoise')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                config.denoise 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sun className="w-4 h-4" />
                <div>
                  <span className="block font-bold">Compression Denoise & Sharpen</span>
                  <span className="text-[10px] text-slate-400 font-normal">Remove pixelation artifacts and blockiness</span>
                </div>
              </div>
              <input type="checkbox" checked={config.denoise} onChange={() => {}} className="accent-amber-500" />
            </button>

            {/* Background Noise Removal */}
            <button
              onClick={() => toggleOption('backgroundNoiseRemoval')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                config.backgroundNoiseRemoval 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4" />
                <div>
                  <span className="block font-bold">Background Noise Removal</span>
                  <span className="text-[10px] text-slate-400 font-normal">Strip hums, fan noise, and background static</span>
                </div>
              </div>
              <input type="checkbox" checked={config.backgroundNoiseRemoval} onChange={() => {}} className="accent-amber-500" />
            </button>

            {/* Vocal Booster */}
            <button
              onClick={() => toggleOption('vocalBooster')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                config.vocalBooster 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mic className="w-4 h-4" />
                <div>
                  <span className="block font-bold">Vocal & Speech Isolation</span>
                  <span className="text-[10px] text-slate-400 font-normal">Boost voice clarity and normalize dialogue volume</span>
                </div>
              </div>
              <input type="checkbox" checked={config.vocalBooster} onChange={() => {}} className="accent-amber-500" />
            </button>

            {/* 60FPS Frame Interpolation */}
            <button
              onClick={() => toggleOption('fpsBoost60')}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                config.fpsBoost60 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4" />
                <div>
                  <span className="block font-bold">60 FPS Motion Interpolation</span>
                  <span className="text-[10px] text-slate-400 font-normal">Synthesize smooth intermediate frames</span>
                </div>
              </div>
              <input type="checkbox" checked={config.fpsBoost60} onChange={() => {}} className="accent-amber-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
