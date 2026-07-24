import React, { useState } from 'react';
import { 
  Camera, 
  Image as ImageIcon, 
  Download, 
  Sparkles, 
  Grid, 
  Film, 
  Layers,
  CheckCircle2
} from 'lucide-react';

interface ScreenshotGeneratorProps {
  isDarkMode?: boolean;
}

export const ScreenshotGenerator: React.FC<ScreenshotGeneratorProps> = ({ isDarkMode }) => {
  const [extractType, setExtractType] = useState<'frame' | 'gif' | 'sheet' | 'thumbnail'>('frame');
  const [extractedFrames, setExtractedFrames] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateFrames = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
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
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Camera className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Screenshot & Frame Preview Generator
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20">
              HD Frame Extraction
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Extract high-resolution video frames, generate animated GIF previews, thumbnails, and contact sheets.
          </p>
        </div>

        <button
          onClick={handleGenerateFrames}
          disabled={isGenerating}
          className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Extracting HD Frames...' : 'Extract Key Frames'}</span>
        </button>
      </div>

      {/* Mode Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
        <button
          onClick={() => setExtractType('frame')}
          className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            extractType === 'frame'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>HD Still Frames</span>
        </button>

        <button
          onClick={() => setExtractType('gif')}
          className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            extractType === 'gif'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>GIF Previews</span>
        </button>

        <button
          onClick={() => setExtractType('sheet')}
          className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            extractType === 'sheet'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Contact Sheet Grid</span>
        </button>

        <button
          onClick={() => setExtractType('thumbnail')}
          className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            extractType === 'thumbnail'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Cover Thumbnail</span>
        </button>
      </div>

      {/* Extracted Frames Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {extractedFrames.map((url, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video shadow-md hover:shadow-xl transition-all"
          >
            <img src={url} alt={`Frame ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
              <button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `frame_extracted_${idx + 1}.png`;
                  a.click();
                }}
                className="py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-lg"
              >
                <Download className="w-3.5 h-3.5" /> Save PNG
              </button>
            </div>
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] font-mono font-bold text-white">
              Frame #{idx * 45 + 12} (00:0{idx + 1}:24)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
