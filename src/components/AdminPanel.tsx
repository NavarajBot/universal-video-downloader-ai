import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sliders, 
  Key, 
  Activity, 
  ToggleLeft, 
  ToggleRight, 
  CheckCircle2, 
  Server,
  Clock,
  Check,
  X,
  DollarSign,
  AlertCircle,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface AdminPanelProps {
  isDarkMode?: boolean;
  user?: UserProfile;
  setUser?: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isDarkMode, user, setUser }) => {
  const [featureToggles, setFeatureToggles] = useState({
    geminiTranscriptApi: true,
    upscaling4kPipeline: true,
    directYoutubeMediaDownload: true,
    copyrightComplianceShield: true,
    multiSpeakerDiarization: true,
    airtmManualEmailVerification: true,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const toggleFeature = (key: keyof typeof featureToggles) => {
    setFeatureToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApprovePayment = (paymentId: string) => {
    if (!setUser) return;

    setUser((prev) => {
      const currentPayments = prev.pendingPayments || [];
      const target = currentPayments.find((p) => p.id === paymentId);
      if (!target) return prev;

      const updatedPayments = currentPayments.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            status: 'Verified' as const,
            verifiedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          };
        }
        return p;
      });

      const creditsToGrant = target.planOrPack.includes('10,000') ? 10000 : 2500;

      return {
        ...prev,
        aiCreditsRemaining: prev.aiCreditsRemaining + creditsToGrant,
        totalCredits: prev.totalCredits + creditsToGrant,
        pendingPayments: updatedPayments,
      };
    });

    setNotification(`Payment ${paymentId} approved! Credits issued to user.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRejectPayment = (paymentId: string) => {
    if (!setUser) return;

    setUser((prev) => {
      const currentPayments = prev.pendingPayments || [];
      const updatedPayments = currentPayments.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            status: 'Rejected' as const,
          };
        }
        return p;
      });

      return {
        ...prev,
        pendingPayments: updatedPayments,
      };
    });

    setNotification(`Payment ${paymentId} rejected.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const pendingPayments = user?.pendingPayments || [];
  const pendingCount = pendingPayments.filter((p) => p.status === 'Pending Verification').length;

  return (
    <div className={`p-6 rounded-3xl border shadow-xl space-y-6 transition-colors ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900 shadow-indigo-100'
    }`}>
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {notification}
          </span>
          <button onClick={() => setNotification(null)} className="p-1 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              SaaS Admin System Control Panel
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              System Admin
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor API health, system feature flags, FFmpeg worker threads, and manual payment verifications.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5 font-bold">
            <Server className="w-3.5 h-3.5" /> All Services Operational
          </span>
        </div>
      </div>

      {/* Admin Verification Queue for Airtm / PayPal Manual Transfers */}
      <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-500" />
              <span>Manual Email Transfer Verification Queue (Airtm / PayPal)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review user payment notifications sent via manual email transfers before issuing AI credits.
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto ${
            pendingCount > 0 
              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 animate-pulse'
              : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{pendingCount} Transfers Pending Review</span>
          </span>
        </div>

        {pendingPayments.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No pending manual transfers in queue.
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {pendingPayments.map((payment) => {
              const isPending = payment.status === 'Pending Verification';
              return (
                <div
                  key={payment.id}
                  className={`p-4 rounded-xl border text-xs space-y-3 transition-colors ${
                    isPending
                      ? 'bg-amber-500/5 border-amber-500/30'
                      : payment.status === 'Verified'
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/50 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
                        <CreditCard className="w-4 h-4" />
                      </span>
                      <div>
                        <strong className="font-bold text-slate-900 dark:text-white block">
                          {payment.gateway} (${payment.amount})
                        </strong>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Receipt ID: {payment.receiptId}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isPending
                          ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                          : payment.status === 'Verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">User Email</span>
                      <strong className="font-mono text-indigo-500 dark:text-indigo-300">{payment.senderEmail}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Plan Tier</span>
                      <strong className="text-slate-700 dark:text-slate-200">{payment.planOrPack}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Date Submitted</span>
                      <strong className="text-slate-700 dark:text-slate-200">{payment.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Transaction Ref</span>
                      <strong className="font-mono text-slate-700 dark:text-slate-300 truncate block">{payment.transactionNote || 'N/A'}</strong>
                    </div>
                  </div>

                  {isPending && (
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200 dark:border-slate-700/40">
                      <button
                        onClick={() => handleRejectPayment(payment.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject Payment</span>
                      </button>
                      <button
                        onClick={() => handleApprovePayment(payment.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1 shadow-md shadow-emerald-600/20"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Issue Credits</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feature Flag Toggles */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          Global SaaS Feature Flags & Toggles:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {Object.entries(featureToggles).map(([key, val]) => (
            <div
              key={key}
              onClick={() => toggleFeature(key as any)}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors"
            >
              <div>
                <strong className="block font-bold text-slate-900 dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </strong>
                <span className="text-[10px] text-slate-400">
                  {val ? 'Enabled in Production' : 'Disabled / Maintenance'}
                </span>
              </div>

              {val ? (
                <ToggleRight className="w-7 h-7 text-indigo-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-slate-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Server Health Status Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400">FFmpeg Worker Latency</span>
          <strong className="block text-lg font-bold text-emerald-500">24 ms</strong>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400">Gemini 3.6 Flash Latency</span>
          <strong className="block text-lg font-bold text-indigo-500">140 ms</strong>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="text-slate-400">Manual Transfers Queue</span>
          <strong className="block text-lg font-bold text-amber-400">{pendingCount} Pending</strong>
        </div>
      </div>
    </div>
  );
};
