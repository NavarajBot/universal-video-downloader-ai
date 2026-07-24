import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Video, 
  PlaySquare, 
  Facebook, 
  MessageSquare, 
  Twitter, 
  Linkedin, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Layers
} from 'lucide-react';
import { SUPPORTED_SERVICES } from '../data/mockData';
import { ServiceSupport } from '../types';

interface SupportedServicesProps {
  onSelectServiceUrl?: (url: string) => void;
  isDarkMode?: boolean;
}

export const SupportedServices: React.FC<SupportedServicesProps> = ({ onSelectServiceUrl, isDarkMode }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Youtube': return <Youtube className="w-6 h-6 text-red-600" />;
      case 'Instagram': return <Instagram className="w-6 h-6 text-pink-600" />;
      case 'Video': return <Video className="w-6 h-6 text-cyan-400" />;
      case 'PlaySquare': return <PlaySquare className="w-6 h-6 text-sky-500" />;
      case 'Facebook': return <Facebook className="w-6 h-6 text-blue-600" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6 text-orange-600" />;
      case 'Twitter': return <Twitter className="w-6 h-6 text-sky-400" />;
      case 'Linkedin': return <Linkedin className="w-6 h-6 text-blue-700" />;
      default: return <Video className="w-6 h-6 text-indigo-500" />;
    }
  };

  const getSampleUrlForService = (id: string) => {
    switch (id) {
      case 'youtube': return 'https://www.youtube.com/watch?v=demo123456';
      case 'instagram': return 'https://www.instagram.com/reel/C3xDemoReel99/';
      case 'tiktok': return 'https://www.tiktok.com/@creator/video/7291823101';
      case 'vimeo': return 'https://vimeo.com/791823901';
      case 'facebook': return 'https://www.facebook.com/watch/?v=1028391823901';
      case 'reddit': return 'https://www.reddit.com/r/technology/comments/demo_video';
      case 'x': return 'https://x.com/tech/status/19283918230192';
      case 'linkedin': return 'https://www.linkedin.com/posts/techvision_ai-webinar-activity';
      default: return 'https://www.youtube.com/watch?v=demo123456';
    }
  };

  return (
    <section className="py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Multi-Platform Compatibility Engine</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Supported Platforms & Feature Matrices
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Extract video formats, multi-language transcripts, and audio tracks across top global media networks while strictly adhering to each platform's copyright terms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUPPORTED_SERVICES.map((service) => (
          <div
            key={service.id}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/40'
                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100'
            }`}
          >
            <div className="space-y-4">
              {/* Header: Logo + Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {service.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {service.status}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {service.badge}
                </span>
              </div>

              {/* Supported Formats */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Supported Resolutions & Formats:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.supportedFormats.map((fmt, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Legal & Feature Bullet */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
                  <span>Max Quality:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{service.maxQuality}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {service.legalNote}
                </p>
              </div>
            </div>

            {/* Test URL CTA */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4">
              <button
                onClick={() => onSelectServiceUrl && onSelectServiceUrl(getSampleUrlForService(service.id))}
                className="w-full py-2 px-3 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Test {service.name} Analysis</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
