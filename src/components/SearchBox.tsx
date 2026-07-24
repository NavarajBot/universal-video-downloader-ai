import React, { useState } from 'react';
import { Search, Sparkles, Download, FileText, Video, Wand2, ShieldCheck, Clipboard, AlertCircle } from 'lucide-react';
import { PlatformId } from '../types';

interface SearchBoxProps {
  onAnalyzeUrl: (url: string, action?: 'analyze' | 'download' | 'transcript' | 'convert' | 'enhance') => void;
  isLoading?: boolean;
  isDarkMode?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onAnalyzeUrl, isLoading, isDarkMode }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const sampleUrls = [
    { label: 'YouTube (Creative Commons)', url: 'https://www.youtube.com/watch?v=demo123456' },
    { label: 'Instagram Reel', url: 'https://www.instagram.com/reel/C3xDemoReel99/' },
    { label: 'TikTok Video', url: 'https://www.tiktok.com/@creator/video/7291823101' },
    { label: 'Vimeo Pro HD', url: 'https://vimeo.com/791823901' },
  ];

  const handleAction = (action: 'analyze' | 'download' | 'transcript' | 'convert' | 'enhance') => {
    if (!inputUrl.trim()) {
      setErrorMsg('Please paste or type a video URL first.');
      return;
    }
    setErrorMsg('');
    onAnalyzeUrl(inputUrl.trim(), action);
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputUrl(text);
          setErrorMsg('');
        }
      }
    } catch {
      setErrorMsg('Unable to access clipboard. Please paste manually.');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Search Container Card - Sleek Interface Theme Glass Panel */}
      <div className={`p-2.5 sm:p-3 rounded-2xl border shadow-2xl transition-all ${
        isDarkMode 
          ? 'bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl' 
          : 'bg-white border-slate-200/80 shadow-indigo-100/60 backdrop-blur-xl'
      }`}>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleAction('analyze'); }}
          className="space-y-3"
        >
          {/* URL Input Bar */}
          <div className={`relative flex items-center rounded-xl border transition-all ${
            errorMsg 
              ? 'border-rose-500 ring-2 ring-rose-500/20' 
              : isDarkMode 
                ? 'border-white/10 bg-slate-900/60 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20' 
                : 'border-slate-200 bg-slate-50 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20'
          }`}>
            <div className="pl-4 pr-2 text-indigo-400">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="url"
              value={inputUrl}
              onChange={(e) => { setInputUrl(e.target.value); setErrorMsg(''); }}
              placeholder="Paste a supported video URL (YouTube, Instagram, TikTok, Vimeo, Reddit)..."
              className={`w-full py-3.5 pr-24 text-sm font-normal bg-transparent border-none outline-none ${
                isDarkMode ? 'text-white placeholder-slate-500 italic' : 'text-slate-900 placeholder-slate-400'
              }`}
            />

            {/* Paste Button inside bar */}
            <div className="absolute right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium px-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleAction('analyze')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#4F46E5] hover:bg-[#6366F1] shadow-xl shadow-indigo-500/20 active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Link</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('download')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('transcript')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Transcript AI</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('convert')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Video className="w-4 h-4 text-indigo-400" />
              <span>Convert</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('enhance')}
              disabled={isLoading}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Wand2 className="w-4 h-4 text-amber-400" />
              <span>AI Enhance</span>
            </button>
          </div>
        </form>
      </div>

      {/* Supported Platform Status Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs">
        <span className="font-semibold text-slate-500 uppercase tracking-widest text-[11px]">
          Supported Status:
        </span>
        <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>YouTube</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>X (Twitter)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>TikTok</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Vimeo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Reddit</span>
          </div>
        </div>
      </div>

      {/* Quick Demo Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 justify-center text-xs pt-1">
        <span className="font-medium text-slate-500">Try Presets:</span>
        {sampleUrls.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setInputUrl(sample.url); setErrorMsg(''); onAnalyzeUrl(sample.url, 'analyze'); }}
            className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-indigo-400/50 transition-colors cursor-pointer font-medium text-[11px]"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
};
