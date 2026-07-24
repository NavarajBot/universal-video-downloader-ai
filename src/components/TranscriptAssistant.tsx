import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Search, 
  Download, 
  Share2, 
  Globe, 
  CheckCircle2, 
  Clock, 
  User, 
  ListChecks, 
  Tag, 
  Bookmark, 
  Languages, 
  Copy,
  ExternalLink
} from 'lucide-react';
import { TranscriptSegment, AITranscriptSummary } from '../types';
import { MOCK_TRANSCRIPT_SEGMENTS, MOCK_AI_SUMMARY } from '../data/mockData';

interface TranscriptAssistantProps {
  initialTitle?: string;
  initialUrl?: string;
  isDarkMode?: boolean;
}

export const TranscriptAssistant: React.FC<TranscriptAssistantProps> = ({
  initialTitle = 'Mastering Multimodal AI & Video Processing in 2026',
  initialUrl = 'https://www.youtube.com/watch?v=demo123456',
  isDarkMode,
}) => {
  const [segments, setSegments] = useState<TranscriptSegment[]>(MOCK_TRANSCRIPT_SEGMENTS);
  const [summary, setSummary] = useState<AITranscriptSummary>(MOCK_AI_SUMMARY);
  const [activeTab, setActiveTab] = useState<'transcript' | 'summary' | 'captions' | 'export'>('transcript');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerateAiTranscript = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: initialTitle,
          url: initialUrl,
          language: selectedLanguage,
        }),
      });
      const data = await response.json();
      if (data.segments) setSegments(data.segments);
      if (data.summary) setSummary(data.summary);
    } catch (err) {
      console.error('Error calling transcript API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSegments = segments.filter(
    (seg) =>
      seg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seg.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportFile = (format: 'srt' | 'vtt' | 'txt' | 'json') => {
    let content = '';
    if (format === 'srt') {
      content = segments
        .map((s, idx) => `${idx + 1}\n00:${s.start},000 --> 00:${s.end},000\n${s.speaker}: ${s.text}\n`)
        .join('\n');
    } else if (format === 'vtt') {
      content = `WEBVTT\n\n` + segments
        .map((s, idx) => `${idx + 1}\n00:${s.start}.000 --> 00:${s.end}.000\n${s.speaker}: ${s.text}\n`)
        .join('\n');
    } else if (format === 'txt') {
      content = segments.map((s) => `[${s.start}] ${s.speaker}: ${s.text}`).join('\n');
    } else if (format === 'json') {
      content = JSON.stringify({ title: initialTitle, summary, segments }, null, 2);
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${initialTitle.substring(0, 20)}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
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
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              AI Transcript Assistant & Summarizer
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white">
              Powered by Gemini
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Source: <strong className="text-slate-700 dark:text-slate-300">{initialTitle}</strong>
          </p>
        </div>

        {/* Controls: Language Selector & AI Regenerate */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="French">French (Français)</option>
              <option value="German">German (Deutsch)</option>
              <option value="Japanese">Japanese (日本語)</option>
              <option value="Chinese">Chinese (中文)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateAiTranscript}
            disabled={isLoading}
            className="py-2 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{isLoading ? 'Processing AI...' : 'Re-Analyze with AI'}</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('transcript')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'transcript'
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Interactive Transcript ({segments.length} segments)
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'summary'
              ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          AI Summary & Highlights
        </button>

        <button
          onClick={() => setActiveTab('captions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'captions'
              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Social Captions & Blog Draft
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'export'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Export Subtitles (SRT/VTT)
        </button>
      </div>

      {/* Tab 1: Interactive Transcript */}
      {activeTab === 'transcript' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words, topics, or speaker names in transcript..."
              className="w-full pl-9 pr-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 outline-none focus:border-cyan-500"
            />
          </div>

          <div className="max-h-[420px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {filteredSegments.map((seg) => (
              <div
                key={seg.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-cyan-500/40 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px]">
                      {seg.start} - {seg.end}
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <User className="w-3 h-3 text-indigo-500" />
                      {seg.speaker}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(`[${seg.start}] ${seg.speaker}: ${seg.text}`, parseInt(seg.id.replace('t','')))}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    title="Copy segment text"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
                  {seg.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: AI Summary & Highlights */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Overview Summary
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {summary.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Bullet Takeaways */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-cyan-500" /> Key Takeaways
              </h4>
              <ul className="space-y-2 text-xs">
                {summary.bulletPoints.map((bp, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-amber-500" /> Key Action Items
              </h4>
              <ul className="space-y-2 text-xs">
                {summary.actionItems.map((ai, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span className="text-slate-700 dark:text-slate-300">{ai}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timestamped Key Moments Timeline */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-500" /> Key Moments Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {summary.keyMoments.map((km, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-1">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {km.time}
                  </span>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">{km.label}</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{km.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social Captions & Blog Draft */}
      {activeTab === 'captions' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
              Suggested Blog Article Title
            </span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {summary.suggestedBlogTitle}
            </h3>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-purple-500" /> Multi-Platform Social Captions
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summary.socialCaptions.map((sc, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      {sc.platform}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {sc.text}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {sc.hashtags.map((ht, hIdx) => (
                        <span key={hIdx} className="text-[10px] font-semibold text-indigo-500">
                          {ht}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(`${sc.text} ${sc.hashtags.join(' ')}`, idx + 100)}
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedIndex === idx + 100 ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Export Options */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-lg font-bold">Download Subtitle & Transcript Files</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Export high-precision SRT or VTT subtitle tracks compatible with YouTube, Premiere Pro, Final Cut, and VLC Media Player.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => handleExportFile('srt')}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-cyan-500 text-center space-y-2 transition-all cursor-pointer group"
            >
              <Download className="w-6 h-6 text-cyan-500 mx-auto group-hover:scale-110 transition-transform" />
              <strong className="block text-xs font-bold">SRT Subtitles</strong>
              <span className="text-[10px] text-slate-400 block">SubRip Format</span>
            </button>

            <button
              onClick={() => handleExportFile('vtt')}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-500 text-center space-y-2 transition-all cursor-pointer group"
            >
              <Download className="w-6 h-6 text-indigo-500 mx-auto group-hover:scale-110 transition-transform" />
              <strong className="block text-xs font-bold">WebVTT Track</strong>
              <span className="text-[10px] text-slate-400 block">HTML5 Web Video</span>
            </button>

            <button
              onClick={() => handleExportFile('txt')}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-purple-500 text-center space-y-2 transition-all cursor-pointer group"
            >
              <Download className="w-6 h-6 text-purple-500 mx-auto group-hover:scale-110 transition-transform" />
              <strong className="block text-xs font-bold">Plain Text (TXT)</strong>
              <span className="text-[10px] text-slate-400 block">Timestamped Log</span>
            </button>

            <button
              onClick={() => handleExportFile('json')}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-emerald-500 text-center space-y-2 transition-all cursor-pointer group"
            >
              <Download className="w-6 h-6 text-emerald-500 mx-auto group-hover:scale-110 transition-transform" />
              <strong className="block text-xs font-bold">JSON Payload</strong>
              <span className="text-[10px] text-slate-400 block">Full Structured AI</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
