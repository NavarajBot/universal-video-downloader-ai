import React from 'react';
import { Sparkles, ShieldCheck, Play, Wand2, FileText, CheckCircle2, Zap } from 'lucide-react';
import { SearchBox } from './SearchBox';

interface HeroSectionProps {
  onAnalyzeUrl: (url: string, action?: 'analyze' | 'download' | 'transcript' | 'convert' | 'enhance') => void;
  isLoading?: boolean;
  isDarkMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAnalyzeUrl, isLoading, isDarkMode }) => {
  return (
    <div className="relative py-10 lg:py-16 flex flex-col items-center justify-center">
      {/* Background Ambient Blur Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="text-center space-y-6 z-10 w-full max-w-5xl px-4">
        {/* Top Feature Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[12px] text-indigo-300 font-medium tracking-wide uppercase">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>New: AI Transcript Summary & 4K Upscaler v2.0</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto text-slate-900 dark:text-white">
          Download, Convert & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">Enhance</span> Videos with AI
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Professional tools for content creators. Extract subtitles, summarize transcripts with Gemini AI, convert formats, and upscale video quality—all in one secure, high-speed platform.
        </p>

        {/* Interactive Search Tool Box */}
        <div className="mt-8 w-full max-w-3xl mx-auto">
          <SearchBox onAnalyzeUrl={onAnalyzeUrl} isLoading={isLoading} isDarkMode={isDarkMode} />
        </div>

        {/* Mini Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 w-full max-w-5xl text-left">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-3">
              <Wand2 className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">AI Enhancer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Upscale to 4K resolution and remove audio noise automatically.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Smart Transcripts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Generate SEO-optimized summaries and time-stamped notes.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Multi-Format</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Convert to MP4, MP3, WEBM, or MOV with frame-accurate control.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl">
            <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">100% Compliant</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Download authorized content safely with built-in copyright verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
