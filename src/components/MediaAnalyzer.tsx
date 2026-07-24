import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Video, 
  Wand2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Sparkles, 
  Radio, 
  Music, 
  Layers, 
  Share2,
  AlertTriangle
} from 'lucide-react';
import { MediaAnalysisResult, VideoResolutionFormat, DownloadQueueItem } from '../types';

interface MediaAnalyzerProps {
  media: MediaAnalysisResult;
  onAddToQueue: (item: DownloadQueueItem) => void;
  onOpenTranscript: () => void;
  onOpenConverter: () => void;
  onOpenEnhancer: () => void;
  isDarkMode?: boolean;
}

export const MediaAnalyzer: React.FC<MediaAnalyzerProps> = ({
  media,
  onAddToQueue,
  onOpenTranscript,
  onOpenConverter,
  onOpenEnhancer,
  isDarkMode,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<VideoResolutionFormat>(
    media.availableFormats[1] || media.availableFormats[0]
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const handleStartDownload = () => {
    setIsDownloading(true);

    // Create queue item
    const newItem: DownloadQueueItem = {
      id: `dl-${Date.now()}`,
      title: media.title,
      platform: media.platform,
      format: selectedFormat.container.toUpperCase(),
      quality: selectedFormat.label,
      fileSize: selectedFormat.fileSizeEstimate,
      progress: 0,
      speed: '12.4 MB/s',
      eta: '8s',
      status: 'downloading',
      dateAdded: new Date().toLocaleTimeString(),
      downloadUrl: selectedFormat.isAudioOnly ? '/sample-audio.mp3' : '/sample-video.mp4',
    };

    onAddToQueue(newItem);

    // Simulate instant sample download trigger
    setTimeout(() => {
      setIsDownloading(false);
      // Trigger browser download simulation
      const element = document.createElement('a');
      const file = new Blob([`Universal Video Downloader AI - Sample File Download for ${media.title}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${media.title.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedFormat.resolution}.${selectedFormat.container}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  return (
    <div className={`p-6 rounded-3xl border shadow-2xl transition-colors space-y-6 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-white' 
        : 'bg-white border-slate-200 text-slate-900 shadow-indigo-100'
    }`}>
      {/* Top Header & Compliance Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <h2 className="text-xl font-extrabold tracking-tight">
            Media Analysis Complete
          </h2>
          <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider border border-indigo-500/20">
            {media.platform}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            {media.copyrightStatus}
          </span>
        </div>
      </div>

      {/* Main Content Grid: Preview Card + Resolution Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Video Preview & Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden group border border-slate-200 dark:border-slate-800 shadow-lg">
            <img 
              src={media.thumbnailUrl} 
              alt={media.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-between p-4 text-white">
              <div className="self-end px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-xs font-mono font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {media.duration}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300">{media.author}</p>
                <h3 className="font-bold text-sm text-white line-clamp-2">{media.title}</h3>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-400 font-medium block">Total Views</span>
              <strong className="text-sm font-bold">{media.views}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-400 font-medium block">Upload Date</span>
              <strong className="text-sm font-bold">{media.uploadDate}</strong>
            </div>
          </div>

          {/* Legal Compliance Banner */}
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>ToS Compliance Verified</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              {media.complianceNotice}
            </p>
          </div>
        </div>

        {/* Right Column: Formats & AI Quick Tools */}
        <div className="lg:col-span-7 space-y-6">
          {/* Format Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-500" />
                Select Resolution & Audio Quality:
              </h4>
              <span className="text-xs text-slate-400 font-medium">
                {media.availableFormats.length} Available Formats
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {media.availableFormats.map((fmt) => {
                const isSelected = selectedFormat.id === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        {fmt.isAudioOnly ? (
                          <Music className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Video className="w-4 h-4 text-indigo-500" />
                        )}
                        <span className="text-xs font-bold">{fmt.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Bitrate: {fmt.bitrate} • Container: {fmt.container.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        {fmt.fileSizeEstimate}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 ml-auto mt-0.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Action Trigger */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-cyan-900/10 border border-indigo-500/20 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Selected: <strong className="text-indigo-600 dark:text-indigo-400">{selectedFormat.label} ({selectedFormat.fileSizeEstimate})</strong>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High-Speed Server Pipeline
              </span>
            </div>

            <button
              onClick={handleStartDownload}
              disabled={isDownloading}
              className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing High-Speed Download...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Selected Format ({selectedFormat.fileSizeEstimate})</span>
                </>
              )}
            </button>
          </div>

          {/* Subtitle Languages Available */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Subtitles & Auto Transcripts:
            </h5>
            <div className="flex flex-wrap gap-2">
              {media.availableSubtitles.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-500" />
                  {sub.name}
                </span>
              ))}
            </div>
          </div>

          {/* AI Workflow Action Shortcut Buttons */}
          <div className="pt-2 grid grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onOpenTranscript}
              className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Transcript AI</span>
            </button>

            <button
              onClick={onOpenConverter}
              className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Convert Format</span>
            </button>

            <button
              onClick={onOpenEnhancer}
              className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>Enhance Quality</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
