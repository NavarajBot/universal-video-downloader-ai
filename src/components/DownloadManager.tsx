import React, { useState } from 'react';
import { 
  FolderDown, 
  Search, 
  Pause, 
  Play, 
  CheckCircle2, 
  Download, 
  Trash2, 
  Cloud, 
  Tag, 
  Sparkles,
  Clock
} from 'lucide-react';
import { DownloadQueueItem } from '../types';

interface DownloadManagerProps {
  queue: DownloadQueueItem[];
  setQueue: React.Dispatch<React.SetStateAction<DownloadQueueItem[]>>;
  isDarkMode?: boolean;
}

export const DownloadManager: React.FC<DownloadManagerProps> = ({ queue, setQueue, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const togglePause = (id: string) => {
    setQueue(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'downloading' ? 'paused' : 'downloading',
        };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  const filteredQueue = queue.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
              <FolderDown className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Download Manager & Cloud Sync
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              {queue.length} Active Items
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track active multi-stream downloads, cloud backups, and local media exports.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search downloads..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Queue Items List */}
      <div className="space-y-3">
        {filteredQueue.length === 0 ? (
          <div className="p-12 text-center space-y-2 border border-dashed rounded-2xl border-slate-300 dark:border-slate-800">
            <FolderDown className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-sm">No Active Downloads in Queue</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Paste a video URL on the Home tab to analyze and add media formats to your download queue.
            </p>
          </div>
        ) : (
          filteredQueue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px]">
                      {item.platform}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                    <span>Quality: {item.quality} ({item.format})</span>
                    <span>• Size: {item.fileSize}</span>
                    <span>• Added: {item.dateAdded}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {item.status === 'downloading' && (
                    <button
                      onClick={() => togglePause(item.id)}
                      className="p-2 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors cursor-pointer"
                      title="Pause download"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  )}

                  {item.status === 'paused' && (
                    <button
                      onClick={() => togglePause(item.id)}
                      className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors cursor-pointer"
                      title="Resume download"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([`Sample file download for ${item.title}`], { type: 'text/plain' });
                      element.href = URL.createObjectURL(file);
                      element.download = `${item.title.substring(0, 20)}.${item.format.toLowerCase()}`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                    title="Direct File Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-colors cursor-pointer"
                    title="Remove from queue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Cloud className="w-3.5 h-3.5 text-indigo-500" />
                    Status: <strong className="text-indigo-600 dark:text-indigo-400 capitalize">{item.status}</strong> ({item.speed})
                  </span>
                  <span>{item.progress}% • ETA: {item.eta}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 h-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
