import React from 'react';
import { ShieldCheck, Info, Lock } from 'lucide-react';

interface LegalNoticeBannerProps {
  isDarkMode?: boolean;
}

export const LegalNoticeBanner: React.FC<LegalNoticeBannerProps> = ({ isDarkMode }) => {
  return (
    <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-colors ${
      isDarkMode 
        ? 'bg-slate-800/60 border-slate-700/80 text-slate-300' 
        : 'bg-indigo-50/70 border-indigo-100 text-slate-700'
    }`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Legal & Platform Compliance Policy
            </h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              ToS Verified
            </span>
          </div>
          <p>
            Universal Video Downloader AI operates strictly in accordance with copyright laws, Fair Use guidelines, and platform Terms of Service. 
            Downloading is enabled only for user-owned media, Public Domain content, and Creative Commons authorized material. 
            For restricted platforms, transcript extraction, AI summarization, subtitle processing, and media format conversion are fully supported for personal study and archival use.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium pt-1 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-500" /> End-to-End Encrypted Transfers
            </span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-indigo-500" /> No DRM Bypassing
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-500" /> Auto Copyright Risk Detection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
