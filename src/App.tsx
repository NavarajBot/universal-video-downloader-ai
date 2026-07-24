import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Download, 
  Video, 
  FileText, 
  Wand2, 
  Languages, 
  Camera, 
  Volume2, 
  FolderDown, 
  BarChart3, 
  CreditCard, 
  BookOpen, 
  HelpCircle, 
  ShieldAlert,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { LegalNoticeBanner } from './components/LegalNoticeBanner';
import { HeroSection } from './components/HeroSection';
import { MediaAnalyzer } from './components/MediaAnalyzer';
import { TranscriptAssistant } from './components/TranscriptAssistant';
import { AIEnhancer } from './components/AIEnhancer';
import { VideoConverter } from './components/VideoConverter';
import { SubtitleToolkit } from './components/SubtitleToolkit';
import { ScreenshotGenerator } from './components/ScreenshotGenerator';
import { AudioStudio } from './components/AudioStudio';
import { DownloadManager } from './components/DownloadManager';
import { DashboardView } from './components/DashboardView';
import { PricingSection } from './components/PricingSection';
import { BlogSection } from './components/BlogSection';
import { HelpCenter } from './components/HelpCenter';
import { AdminPanel } from './components/AdminPanel';
import { UserAccountModal } from './components/UserAccountModal';
import { CopyrightAssistantModal } from './components/CopyrightAssistantModal';
import { Footer } from './components/Footer';

import { 
  MediaAnalysisResult, 
  UserProfile, 
  DownloadQueueItem, 
  NavigationTab 
} from './types';
import { MOCK_MEDIA_ANALYSIS, MOCK_USER_PROFILE, MOCK_DOWNLOAD_QUEUE } from './data/mockData';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [user, setUser] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [mediaResult, setMediaResult] = useState<MediaAnalysisResult | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<DownloadQueueItem[]>(MOCK_DOWNLOAD_QUEUE);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCopyrightModal, setShowCopyrightModal] = useState(false);

  // Sync theme to document body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAnalyzeUrl = async (url: string, action?: 'analyze' | 'download' | 'transcript' | 'convert' | 'enhance') => {
    setIsAnalyzing(true);
    setMediaResult(null);

    try {
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setMediaResult(data);
    } catch (err) {
      console.error('Error analyzing URL:', err);
      // Fallback to mock data on error for resilient demo
      setMediaResult(MOCK_MEDIA_ANALYSIS);
    } finally {
      setIsAnalyzing(false);
    }

    if (action === 'transcript') {
      setActiveTab('transcript');
    } else if (action === 'convert') {
      setActiveTab('converter');
    } else if (action === 'enhance') {
      setActiveTab('enhancer');
    } else {
      setTimeout(() => {
        const el = document.getElementById('analyzer-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAddDownload = (format: any) => {
    if (!mediaResult) return;

    const newItem: DownloadQueueItem = {
      id: `queue-${Date.now()}`,
      title: mediaResult.title,
      platform: mediaResult.platform,
      quality: format.resolution || format.quality || '1080p',
      format: format.container || format.extension || 'MP4',
      fileSize: format.fileSize || '120 MB',
      progress: 0,
      status: 'downloading',
      speed: '18.5 MB/s',
      eta: '12s',
      dateAdded: 'Just now',
    };

    setDownloadQueue(prev => [newItem, ...prev]);
    setActiveTab('downloads');
  };

  return (
    <div className={`min-h-screen font-['Inter',sans-serif] relative transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0F172A] text-white selection:bg-indigo-500 selection:text-white' 
        : 'bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white'
    }`}>
      {/* Background Ambient Glow Effects from Sleek Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[5%] w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Top Compliance Banner */}
      <LegalNoticeBanner />

      {/* Primary Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAccount={() => setShowAccountModal(true)}
        onOpenCopyrightModal={() => setShowCopyrightModal(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Navigation Tabs Header Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-slate-200 dark:border-white/10">
          {[
            { id: 'home', label: 'Home / Downloader', icon: Sparkles },
            { id: 'dashboard', label: 'Dashboard & Stats', icon: BarChart3 },
            { id: 'transcript', label: 'AI Transcript & Summary', icon: FileText },
            { id: 'enhancer', label: 'AI 4K Video Enhancer', icon: Wand2 },
            { id: 'converter', label: 'Format Converter', icon: Video },
            { id: 'subtitles', label: 'Subtitle Toolkit', icon: Languages },
            { id: 'screenshots', label: 'Frame Extractor', icon: Camera },
            { id: 'audio', label: 'Audio Studio', icon: Volume2 },
            { id: 'downloads', label: `Downloads (${downloadQueue.length})`, icon: FolderDown },
            { id: 'pricing', label: 'Pricing Plans', icon: CreditCard },
            { id: 'blog', label: 'Creator Guides', icon: BookOpen },
            { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
            { id: 'admin', label: 'Admin Panel', icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as NavigationTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#4F46E5] text-white font-bold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 border border-transparent dark:hover:border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Home (Hero, URL Input, Media Analysis Result View) */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HeroSection onAnalyzeUrl={handleAnalyzeUrl} isLoading={isAnalyzing} isDarkMode={isDarkMode} />

            {/* Media Analysis Output View */}
            {mediaResult && (
              <div id="analyzer-section" className="scroll-mt-10">
                <MediaAnalyzer
                  media={mediaResult}
                  onDownloadFormat={handleAddDownload}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView user={user} isDarkMode={isDarkMode} />
        )}

        {/* Tab 3: AI Transcript Assistant */}
        {activeTab === 'transcript' && (
          <TranscriptAssistant
            initialTitle={mediaResult ? mediaResult.title : undefined}
            initialUrl={mediaResult ? mediaResult.url : undefined}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Tab 4: AI 4K Enhancer */}
        {activeTab === 'enhancer' && (
          <AIEnhancer isDarkMode={isDarkMode} />
        )}

        {/* Tab 5: Format Converter */}
        {activeTab === 'converter' && (
          <VideoConverter isDarkMode={isDarkMode} />
        )}

        {/* Tab 6: Subtitle Toolkit */}
        {activeTab === 'subtitles' && (
          <SubtitleToolkit isDarkMode={isDarkMode} />
        )}

        {/* Tab 7: Frame Extractor */}
        {activeTab === 'screenshots' && (
          <ScreenshotGenerator isDarkMode={isDarkMode} />
        )}

        {/* Tab 8: Audio Studio */}
        {activeTab === 'audio' && (
          <AudioStudio isDarkMode={isDarkMode} />
        )}

        {/* Tab 9: Downloads Manager */}
        {activeTab === 'downloads' && (
          <DownloadManager queue={downloadQueue} setQueue={setDownloadQueue} isDarkMode={isDarkMode} />
        )}

        {/* Tab 10: Pricing Section */}
        {activeTab === 'pricing' && (
          <PricingSection user={user} setUser={setUser} isDarkMode={isDarkMode} />
        )}

        {/* Tab 11: Blog & Creator Guides */}
        {activeTab === 'blog' && (
          <BlogSection isDarkMode={isDarkMode} />
        )}

        {/* Tab 12: Help Center & FAQ */}
        {activeTab === 'help' && (
          <HelpCenter isDarkMode={isDarkMode} />
        )}

        {/* Tab 13: Admin Panel */}
        {activeTab === 'admin' && (
          <AdminPanel isDarkMode={isDarkMode} user={user} setUser={setUser} />
        )}
      </main>

      {/* Footer Component */}
      <Footer setActiveTab={setActiveTab} />

      {/* Account Modal */}
      {showAccountModal && (
        <UserAccountModal
          user={user}
          setUser={setUser}
          onClose={() => setShowAccountModal(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Copyright Assistant Modal */}
      {showCopyrightModal && (
        <CopyrightAssistantModal
          onClose={() => setShowCopyrightModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
