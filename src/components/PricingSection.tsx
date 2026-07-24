import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  DollarSign, 
  Smartphone, 
  Wallet, 
  Building2, 
  QrCode,
  Lock,
  ArrowRight,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { CheckoutModal } from './CheckoutModal';

interface PricingSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ user, setUser, isDarkMode }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [checkoutItem, setCheckoutItem] = useState<{
    name: 'Pro' | 'Business' | 'Credits Pack';
    price: number;
    period: 'month' | 'year' | 'one-time';
    creditsGranted: number;
    storageGrantedGB?: number;
  } | null>(null);

  const handleOpenPlanCheckout = (planName: 'Pro' | 'Business') => {
    const isPro = planName === 'Pro';
    const price = isPro ? (isAnnual ? 180 : 19) : (isAnnual ? 468 : 49);
    const period = isAnnual ? 'year' : 'month';
    const credits = isPro ? 2500 : 10000;
    const storage = isPro ? 100 : 500;

    setCheckoutItem({
      name: planName,
      price,
      period,
      creditsGranted: credits,
      storageGrantedGB: storage,
    });
  };

  const handleOpenCreditPackCheckout = (packName: string, credits: number, price: number) => {
    setCheckoutItem({
      name: 'Credits Pack',
      price,
      period: 'one-time',
      creditsGranted: credits,
    });
  };

  const plans = [
    {
      name: 'Free' as const,
      priceNum: 0,
      priceMonthly: '$0',
      priceAnnual: '$0',
      description: 'Ideal for occasional personal downloads and basic format conversions.',
      credits: '200 AI Credits/mo',
      storage: '5 GB Cloud Storage',
      features: [
        'Standard 1080p downloads where supported',
        'Basic video format conversions (MP4, MP3)',
        'Standard AI transcript extraction',
        'ToS & Copyright safety verification',
        'Community Help Center access',
      ],
      cta: 'Current Plan',
      popular: false,
    },
    {
      name: 'Pro' as const,
      priceNum: isAnnual ? 15 : 19,
      priceMonthly: '$19',
      priceAnnual: '$15',
      description: 'Designed for active creators, podcasters, and video editors.',
      credits: '2,500 AI Credits/mo',
      storage: '100 GB Cloud Storage',
      features: [
        '4K Ultra HD downloads where permitted',
        'Unlimited format conversions (all containers)',
        'Full Gemini AI transcript summarizer & translator',
        'AI Video 4K upscaling & audio noise reduction',
        'Subtitle cleanup & multi-track SRT/VTT exports',
        'High-speed priority cloud queue',
      ],
      cta: 'Upgrade with Payment Gateway',
      popular: true,
    },
    {
      name: 'Business' as const,
      priceNum: isAnnual ? 39 : 49,
      priceMonthly: '$49',
      priceAnnual: '$39',
      description: 'Built for agencies, media teams, and high-volume automation.',
      credits: '10,000 AI Credits/mo',
      storage: '500 GB Cloud Storage',
      features: [
        'Everything in Pro Plan',
        'Dedicated team workspace & shared cloud storage',
        'Full REST API access for automated workflows',
        'Priority 24/7 dedicated support SLA',
        'Custom copyright & compliance reporting',
        'Custom FFmpeg bitrate parameters',
      ],
      cta: 'Upgrade with Payment Gateway',
      popular: false,
    },
  ];

  const creditPacks = [
    { name: 'Starter Boost', credits: 500, price: 5, badge: 'Quick Top-Up' },
    { name: 'Creator Pack', credits: 2500, price: 15, badge: 'Most Popular', popular: true },
    { name: 'Pro Studio Pack', credits: 6000, price: 30, badge: 'Best Value (+20% Bonus)' },
  ];

  return (
    <section className="py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Flexible SaaS Subscription & Payment Gateways</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Simple, Transparent Pricing with All Payment Gateways
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Pay with Credit Card (Stripe), PayPal, Airtm e-Wallet, Wise, Payoneer, Apple Pay, Google Pay, or Bank Wire.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-indigo-600 p-1 flex items-center transition-colors cursor-pointer"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1 ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Main Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((p) => {
          const isCurrent = user.plan === p.name;
          return (
            <div
              key={p.name}
              className={`p-6 rounded-3xl border transition-all relative flex flex-col justify-between ${
                p.popular
                  ? 'border-indigo-500 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-[#0F172A] shadow-2xl shadow-indigo-950/50 ring-2 ring-indigo-500/40'
                  : isDarkMode
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-slate-200 shadow-lg shadow-indigo-100'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                  Most Popular for Creators
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{p.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <strong className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {isAnnual ? p.priceAnnual : p.priceMonthly}
                  </strong>
                  <span className="text-xs text-slate-400 font-medium">/ month</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs space-y-1">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">{p.credits}</div>
                  <div className="text-slate-500 dark:text-slate-400">{p.storage}</div>
                </div>

                <ul className="space-y-2.5 text-xs">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-white/10 text-slate-400 cursor-default"
                  >
                    Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenPlanCheckout(p.name as 'Pro' | 'Business')}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      p.popular
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-indigo-600/30 active:scale-98'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-98'
                    }`}
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant AI Credit Top-Up Section */}
      <div className="max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Need Extra AI Credits On Demand?</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">Instant AI Credits Top-Up Store</h3>
            <p className="text-xs text-slate-400">
              Top up your credits anytime without changing your monthly subscription. Use credits for 4K AI video upscaling, transcription, or format conversions.
            </p>
          </div>
          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
            Current Balance: {user.aiCreditsRemaining.toLocaleString()} Credits
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {creditPacks.map((pack) => (
            <div
              key={pack.name}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                pack.popular
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg'
                  : 'border-white/10 bg-slate-900/60 hover:border-white/20'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-indigo-300">
                  {pack.badge}
                </span>
                <h4 className="font-extrabold text-base text-white">{pack.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-indigo-400">+{pack.credits.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-medium">AI Credits</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-4">
                <span className="text-lg font-black text-white">${pack.price}</span>
                <button
                  onClick={() => handleOpenCreditPackCheckout(pack.name, pack.credits, pack.price)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                >
                  Buy Pack
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Payment Gateways Footer Banner */}
      <div className="max-w-6xl mx-auto p-6 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-md space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Supported Payment Gateways & Global Partners</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            <span>Stripe Cards (Visa, MC, Amex)</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span>PayPal Express</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <Globe className="w-4 h-4 text-teal-400" />
            <span>Airtm e-Wallet</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Wise & Payoneer International</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <Smartphone className="w-4 h-4 text-white" />
            <span>Apple Pay & Google Pay</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Bank Wire & ACH Direct</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
            <QrCode className="w-4 h-4 text-sky-400" />
            <span>Alipay & WeChat Pay</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 pt-1">
          All transactions are secured with 256-bit SSL encryption. Tax invoice & receipt emailed instantly upon purchase.
        </p>
      </div>

      {/* Checkout Modal Trigger */}
      {checkoutItem && (
        <CheckoutModal
          user={user}
          setUser={setUser}
          planToBuy={checkoutItem}
          onClose={() => setCheckoutItem(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </section>
  );
};

