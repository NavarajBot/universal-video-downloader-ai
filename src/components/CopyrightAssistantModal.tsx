import React, { useState } from 'react';
import { X, ShieldAlert, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Scale, Lock } from 'lucide-react';

interface CopyrightAssistantModalProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

export const CopyrightAssistantModal: React.FC<CopyrightAssistantModalProps> = ({ onClose, isDarkMode }) => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=demo123456');
  const [title, setTitle] = useState('Mastering Multimodal AI & Video Processing in 2026');
  const [platform, setPlatform] = useState('youtube');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleRunCopyrightCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/ai/copyright-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl, title, platform }),
      });
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error('Error running copyright check:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className={`w-full max-w-xl p-6 rounded-3xl border shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Scale className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-extrabold">AI Copyright Risk & Compliance Inspector</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by Gemini AI. Analyzes video URLs and licensing metadata to verify ToS and legal download permissions.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRunCopyrightCheck} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Video URL:</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Video Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEvaluating ? 'Evaluating Legal Risk via Gemini AI...' : 'Run Legal Compliance Check'}</span>
          </button>
        </form>

        {/* Report Results */}
        {report && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compliance Score</span>
                <div className="text-2xl font-extrabold text-emerald-500">{report.complianceScore} / 100</div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> {report.riskLevel}
              </span>
            </div>

            <div className="space-y-1">
              <strong className="block font-bold text-slate-900 dark:text-white">Detected License:</strong>
              <p className="text-slate-600 dark:text-slate-300">{report.licenseDetected}</p>
            </div>

            <div className="space-y-1">
              <strong className="block font-bold text-slate-900 dark:text-white">ToS Summary:</strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{report.tosComplianceSummary}</p>
            </div>

            {report.guidanceAdvice && (
              <div className="space-y-1.5 pt-2">
                <strong className="block font-bold text-slate-900 dark:text-white">Legal Guidance & Advice:</strong>
                <ul className="space-y-1">
                  {report.guidanceAdvice.map((adv: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
