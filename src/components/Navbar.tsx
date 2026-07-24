import React from 'react';
import { 
  Sparkles, 
  Download, 
  Video, 
  FileText, 
  Wand2, 
  Volume2, 
  BarChart3, 
  CreditCard, 
  HelpCircle, 
  BookOpen, 
  ShieldAlert, 
  User, 
  Sun, 
  Moon,
  Camera,
  FolderDown,
  Globe,
  Scale
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: UserProfile;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenAccount: () => void;
  onOpenCopyrightModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleDarkMode,
  user,
  activeTab,
  setActiveTab,
  onOpenAccount,
  onOpenCopyrightModal,
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
      isDarkMode 
        ? 'bg-[#0F172A]/85 border-white/5 text-white' 
        : 'bg-white/90 border-slate-200 text-slate-900'
    }`}>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-[#4F46E5] via-indigo-600 to-[#06B6D4] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Universal Video AI — High-Speed Compliant Downloader & AI Suite</span>
        <button 
          onClick={onOpenCopyrightModal}
          className="ml-2 underline hover:text-cyan-200 cursor-pointer font-semibold flex items-center gap-1"
        >
          <Scale className="w-3.5 h-3.5" /> Check Legal Risk
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45 flex items-center justify-center">
                <Download className="w-2.5 h-2.5 text-indigo-700 -rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white dark:text-white">
                  UVD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-white/5 border border-white/10 text-indigo-300">
                  {user.plan}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium hidden sm:block">
                Downloader • Converter • AI Transcripts
              </p>
            </div>
          </div>

          {/* Quick Right Utilities */}
          <div className="flex items-center gap-3">
            {/* AI Credits Badge */}
            <div 
              onClick={() => setActiveTab('pricing')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-bold text-xs cursor-pointer hover:bg-indigo-500/20 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{user.aiCreditsRemaining} Credits</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Get Started / Account Profile Trigger */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all cursor-pointer active:scale-95"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[10px]">
                {user.name.charAt(0)}
              </div>
              <span className="font-bold hidden md:inline">{user.name}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
