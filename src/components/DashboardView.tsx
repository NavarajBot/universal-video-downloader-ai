import React from 'react';
import { 
  BarChart3, 
  Download, 
  Video, 
  FileText, 
  Wand2, 
  HardDrive, 
  Sparkles, 
  TrendingUp, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  isDarkMode?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user, isDarkMode }) => {
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
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Platform Usage Dashboard & Analytics
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              Real-time Metrics
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Overview of total downloads, media conversions, transcript exports, and remaining AI credits.
          </p>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Downloads</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">1,248</strong>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18% this week
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Format Conversions</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">482</strong>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% this week
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">AI Transcript Exports</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">319</strong>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +24% this week
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">AI Credits Balance</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {user.aiCreditsRemaining} / {user.totalCredits}
            </strong>
            <span className="text-[10px] font-bold text-amber-500">Pro Plan Active</span>
          </div>
        </div>
      </div>

      {/* Storage Used Progress Bar */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-indigo-500/5 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <HardDrive className="w-4 h-4 text-indigo-500" /> Cloud Storage Utilization:
          </span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400">
            {user.storageUsedGB} GB / {user.maxStorageGB} GB Used
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full"
            style={{ width: `${(user.storageUsedGB / user.maxStorageGB) * 100}%` }}
          />
        </div>
      </div>

      {/* Activity Stream */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-500" />
          Recent Account Activity Stream:
        </h3>

        <div className="space-y-2 text-xs">
          {[
            { action: 'Downloaded 4K MP4 (Creative Commons)', title: 'AI in 2026: Multimodal Processing', time: '10 mins ago', type: 'download' },
            { action: 'Generated AI Transcript & Social Captions', title: 'TechVision Webinar Episode 4', time: '42 mins ago', type: 'ai' },
            { action: 'Converted MOV to MP3 (320kbps)', title: 'Podcast_Audio_Track_Uncompressed', time: '2 hours ago', type: 'convert' },
            { action: 'Applied 4K Upscale & Denoise', title: 'Documentary_Short_Teaser.mp4', time: 'Yesterday', type: 'enhance' },
          ].map((act, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <div>
                  <strong className="block font-bold text-slate-900 dark:text-white">{act.action}</strong>
                  <span className="text-[11px] text-slate-400">{act.title}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
