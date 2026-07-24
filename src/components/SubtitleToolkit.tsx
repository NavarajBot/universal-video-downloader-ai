import React, { useState } from 'react';
import { 
  FileText, 
  Globe, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Wand2, 
  Languages, 
  RefreshCw,
  Copy
} from 'lucide-react';

interface SubtitleToolkitProps {
  isDarkMode?: boolean;
}

export const SubtitleToolkit: React.FC<SubtitleToolkitProps> = ({ isDarkMode }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [targetFormat, setTargetFormat] = useState<'srt' | 'vtt' | 'txt' | 'json'>('srt');
  const [subtitleContent, setSubtitleContent] = useState(`1
00:00:01,000 --> 00:00:04,500
Welcome to the Universal AI Video Processing Platform.

2
00:00:05,000 --> 00:00:09,200
In this video, we explore automated subtitle extraction and multi-language translation.

3
00:00:10,000 --> 00:00:14,800
Extract SRT, WebVTT, and JSON captions in over 50 languages instantly.`);

  const [isCleaning, setIsCleaning] = useState(false);

  const handleAiCleanup = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setSubtitleContent((prev) =>
        prev
          .replace(/um,|uh,/gi, '')
          .replace(/\b(like|you know)\b/gi, '')
      );
      setIsCleaning(false);
    }, 1200);
  };

  const handleDownloadSubtitle = () => {
    const blob = new Blob([subtitleContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles_${selectedLang}.${targetFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Languages className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Subtitle Toolkit & Grammar Cleanup
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              Auto-Language Detect
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Download subtitles, convert between SRT, VTT, and JSON, auto-clean filler words, and re-time offsets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAiCleanup}
            disabled={isCleaning}
            className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isCleaning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            <span>AI Grammar & Filler Word Cleanup</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Language & Export Format */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Target Language:
          </label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
          >
            <option value="en">English (Original)</option>
            <option value="es">Spanish (Español)</option>
            <option value="fr">French (Français)</option>
            <option value="de">German (Deutsch)</option>
            <option value="ja">Japanese (日本語)</option>
            <option value="zh">Chinese (中文)</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Subtitle Format:
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['srt', 'vtt', 'txt', 'json'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setTargetFormat(fmt)}
                className={`py-2 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                  targetFormat === fmt
                    ? 'bg-cyan-500 text-white border-cyan-500'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleDownloadSubtitle}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Subtitles ({targetFormat.toUpperCase()})</span>
          </button>
        </div>
      </div>

      {/* Editable Subtitle Canvas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Subtitle Track Editor (Live Edit Supported):</span>
          <span>{subtitleContent.length} Characters</span>
        </div>

        <textarea
          value={subtitleContent}
          onChange={(e) => setSubtitleContent(e.target.value)}
          rows={10}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-emerald-400 font-mono text-xs outline-none focus:border-cyan-500 leading-relaxed shadow-inner"
        />
      </div>
    </div>
  );
};
