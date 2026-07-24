import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  isDarkMode?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode }) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section className="py-10 space-y-8">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Creator Academy & Knowledge Hub</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Guides, Tutorials & Video AI Insights
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Learn best practices for video archival, AI transcript optimization, copyright compliance, and format conversion.
        </p>
      </div>

      {activeArticle ? (
        <div className={`p-8 rounded-3xl border shadow-2xl max-w-4xl mx-auto space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={() => setActiveArticle(null)}
            className="text-xs font-bold text-indigo-500 hover:underline cursor-pointer flex items-center gap-1"
          >
            ← Back to all articles
          </button>

          <img src={activeArticle.imageUrl} alt={activeArticle.title} className="w-full h-64 object-cover rounded-2xl" />

          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-xs">
              {activeArticle.category}
            </span>
            <h1 className="text-2xl font-extrabold">{activeArticle.title}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span>By {activeArticle.author}</span>
              <span>• {activeArticle.date}</span>
              <span>• {activeArticle.readTime}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert text-sm leading-relaxed space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-base">{activeArticle.summary}</p>
            <p>
              When working with high-definition video archives, maintaining full fidelity without compromising disk space or bandwidth requires a balance of container selection, audio normalization, and neural upscaling.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Understanding Container Formats vs. Codecs</h3>
            <p>
              A container format (such as MP4, WEBM, or MKV) acts as a wrapper holding video streams (H.264, VP9, AV1) and audio streams (AAC, Opus, MP3). Choosing MP4 ensures maximum cross-platform hardware acceleration on modern devices.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Leveraging AI Transcripts for Search Indexing</h3>
            <p>
              By converting audio speech into SRT/WebVTT tracks, content creators improve video accessibility and provide clean transcript text for search engine indexing.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer space-y-4 group flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl'
              }`}
            >
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-500" /> {post.author}
                </span>
                <span className="flex items-center gap-1 font-semibold text-indigo-500">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
