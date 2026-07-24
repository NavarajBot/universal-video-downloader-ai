import React, { useState } from 'react';
import { 
  Volume2, 
  Mic, 
  Sliders, 
  Sparkles, 
  Play, 
  Pause, 
  Scissors, 
  Download, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

interface AudioStudioProps {
  isDarkMode?: boolean;
}

export const AudioStudio: React.FC<AudioStudioProps> = ({ isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeNorm, setVolumeNorm] = useState(85);
  const [vocalBoost, setVocalBoost] = useState(70);
  const [noiseReduction, setNoiseReduction] = useState(90);
  const [format, setFormat] = useState<'mp3' | 'wav' | 'flac' | 'aac'>('mp3');

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
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Volume2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Audio Studio & Vocal Enhancer
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Podcast & Music Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Normalize audio gain, remove background hiss, boost speech vocals, and trim tracks.
          </p>
        </div>

        <button
          onClick={() => {
            const a = document.createElement('a');
            const file = new Blob(['Mastered Audio Sample Track'], { type: 'audio/mpeg' });
            a.href = URL.createObjectURL(file);
            a.download = `mastered_audio_track.${format}`;
            a.click();
          }}
          className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Mastered Track ({format.toUpperCase()})</span>
        </button>
      </div>

      {/* Interactive Waveform Canvas & Controls */}
      <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-lg shadow-emerald-500/30"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <div>
              <h4 className="font-bold text-sm text-white">Audio_Master_Track_Studio.wav</h4>
              <span className="text-[10px] text-emerald-400 font-mono">48 kHz • 24-bit Lossless Stereo</span>
            </div>
          </div>

          <span className="text-xs font-mono text-slate-400">01:24 / 04:12</span>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="h-20 bg-slate-900 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between gap-1 overflow-hidden">
          {Array.from({ length: 64 }).map((_, i) => {
            const height = Math.sin(i * 0.3) * 35 + 40;
            return (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-gradient-to-t from-emerald-500 via-cyan-400 to-indigo-500 animate-pulse' : 'bg-slate-700'
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Volume2 className="w-4 h-4 text-emerald-500" />
              Volume Normalization:
            </span>
            <span className="text-emerald-500 font-mono">{volumeNorm}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volumeNorm}
            onChange={(e) => setVolumeNorm(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Target loudness standard -14 LUFS for streaming.</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Mic className="w-4 h-4 text-cyan-500" />
              Vocal & Speech Boost:
            </span>
            <span className="text-cyan-500 font-mono">{vocalBoost}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vocalBoost}
            onChange={(e) => setVocalBoost(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Isolate dialog frequency bands (1kHz - 4kHz).</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Radio className="w-4 h-4 text-indigo-500" />
              Background Noise Floor:
            </span>
            <span className="text-indigo-500 font-mono">{noiseReduction}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={noiseReduction}
            onChange={(e) => setNoiseReduction(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">Suppress room echo, fan static, and AC hums.</p>
        </div>
      </div>
    </div>
  );
};
