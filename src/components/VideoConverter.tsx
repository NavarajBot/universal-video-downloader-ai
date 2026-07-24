import React, { useState } from 'react';
import { 
  Video, 
  Upload, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Sliders, 
  Music, 
  FileVideo, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ConversionJob } from '../types';

interface VideoConverterProps {
  isDarkMode?: boolean;
}

export const VideoConverter: React.FC<VideoConverterProps> = ({ isDarkMode }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'mp4' | 'mp3' | 'mov' | 'webm' | 'mkv' | 'wav' | 'flac' | 'aac'>('mp4');
  const [bitrate, setBitrate] = useState('320');
  const [resolution, setResolution] = useState('1080p');
  const [fps, setFps] = useState('60');
  const [jobs, setJobs] = useState<ConversionJob[]>([
    {
      id: 'job-1',
      filename: 'Sample_Lecture_Archive.webm',
      fromFormat: 'WEBM',
      toFormat: 'MP4',
      status: 'completed',
      progress: 100,
      outputSize: '340 MB',
      outputUrl: '/sample-converted.mp4',
    },
    {
      id: 'job-2',
      filename: 'Podcast_Episode_Raw.mov',
      fromFormat: 'MOV',
      toFormat: 'MP3',
      status: 'completed',
      progress: 100,
      outputSize: '28 MB',
      outputUrl: '/sample-converted.mp3',
    },
  ]);
  const [isConverting, setIsConverting] = useState(false);

  const handleStartConversion = () => {
    setIsConverting(true);
    const newJob: ConversionJob = {
      id: `job-${Date.now()}`,
      filename: selectedFile ? selectedFile.name : 'Uploaded_Media_File.mp4',
      fromFormat: 'AUTO',
      toFormat: targetFormat.toUpperCase(),
      status: 'processing',
      progress: 25,
      outputSize: targetFormat === 'mp3' ? '18 MB' : '210 MB',
    };

    setJobs(prev => [newJob, ...prev]);

    // Simulate progress updates
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, progress: 75 } : j));
    }, 1000);

    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, progress: 100, status: 'completed', outputUrl: `/converted_${Date.now()}.${targetFormat}` } : j));
      setIsConverting(false);
    }, 2000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`p-6 rounded-3xl border shadow-xl space-y-6 transition-colors ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900 shadow-indigo-100'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Video className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Universal Media Format Converter
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              FFmpeg Cloud Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Convert MP4, MP3, MOV, AVI, MKV, WEBM, FLAC, and WAV with custom bitrate, resolution, and audio extraction.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload Zone + Output Config */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Drag & Drop File Upload */}
        <div className="lg:col-span-6 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
              selectedFile
                ? 'border-emerald-500 bg-emerald-500/5'
                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/40'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              {selectedFile ? (
                <>
                  <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    File Ready: {selectedFile.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Size: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    Drag & Drop Video or Audio File Here
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Supports MP4, MOV, WEBM, MKV, AVI, MP3, WAV up to 4GB
                  </p>
                </>
              )}
            </div>

            <label className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow-md">
              Browse Local Files
              <input
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Right: Output Target Format Options */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-500" />
            Target Conversion Settings:
          </h3>

          <div className="space-y-3 text-xs">
            {/* Format Selector */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Target Format:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['mp4', 'mp3', 'mov', 'webm', 'mkv', 'wav', 'flac', 'aac'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setTargetFormat(fmt)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                      targetFormat === fmt
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Resolution (if video output) */}
            {['mp4', 'mov', 'webm', 'mkv'].includes(targetFormat) && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Output Resolution:
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="4K">4K Ultra HD (3840x2160)</option>
                    <option value="1080p">1080p Full HD (1920x1080)</option>
                    <option value="720p">720p HD (1280x720)</option>
                    <option value="480p">480p SD (854x480)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Frame Rate (FPS):
                  </label>
                  <select
                    value={fps}
                    onChange={(e) => setFps(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="60">60 FPS (Ultra Smooth)</option>
                    <option value="30">30 FPS (Standard)</option>
                    <option value="24">24 FPS (Cinematic)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Audio Bitrate Selector */}
            <div className="pt-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Audio Quality Bitrate:
              </label>
              <select
                value={bitrate}
                onChange={(e) => setBitrate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
              >
                <option value="320">320 kbps (Studio High Quality)</option>
                <option value="256">256 kbps (Standard High Quality)</option>
                <option value="192">192 kbps (Medium Quality)</option>
                <option value="128">128 kbps (Compact)</option>
              </select>
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleStartConversion}
              disabled={isConverting}
              className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-4"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Converting Media Stream...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Start Conversion to {targetFormat.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Conversion History / Jobs List */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
          Recent Conversion Tasks:
        </h3>

        <div className="space-y-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <FileVideo className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{job.filename}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <span>{job.fromFormat}</span>
                    <ArrowRight className="w-3 h-3 text-indigo-500" />
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{job.toFormat}</span>
                    <span>• {job.outputSize}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {job.status === 'processing' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${job.progress}%` }} />
                    </div>
                    <span className="font-bold text-[10px] text-indigo-500">{job.progress}%</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([`Converted sample file for ${job.filename}`], { type: 'text/plain' });
                      element.href = URL.createObjectURL(file);
                      element.download = `${job.filename.split('.')[0]}_converted.${job.toFormat.toLowerCase()}`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
