import React from 'react';
import { Download, ShieldCheck, Heart, Github, Twitter, Youtube, Mail } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isDarkMode }) => {
  return (
    <footer className={`border-t transition-colors ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-400' 
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Download className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Universal Video Downloader AI
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The premier AI-powered video processing platform. Download permitted media, extract multi-language subtitles, convert formats, summarize transcripts, and enhance video quality effortlessly.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#github" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#mail" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product Tools */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              AI Tools & Media
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  Smart Downloader
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('transcript')} className="hover:text-white transition-colors cursor-pointer">
                  AI Transcript Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('enhancer')} className="hover:text-white transition-colors cursor-pointer">
                  AI Video Enhancer (4K)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('converter')} className="hover:text-white transition-colors cursor-pointer">
                  Universal Format Converter
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('audio')} className="hover:text-white transition-colors cursor-pointer">
                  Audio Studio & Vocal Booster
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('screenshots')} className="hover:text-white transition-colors cursor-pointer">
                  Frame & Snapshot Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Platforms */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Supported Platforms
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  YouTube Transcripts & Media
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  Instagram Reels & Audio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  TikTok Clips & Frames
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  Vimeo Pro Transcripts
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  Reddit Video & Audio Merge
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  LinkedIn Educational Clips
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Resources & Legal
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans & Free Tier
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors cursor-pointer">
                  Creator Guides & Blog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors cursor-pointer">
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service & Copyright
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors cursor-pointer">
                  Admin System Panel
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>© {new Date().getFullYear()} Universal Video Downloader AI. All rights reserved. Respecting creator copyright worldwide.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with Gemini AI & High Performance Cloud Processing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
