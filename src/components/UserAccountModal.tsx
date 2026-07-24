import React, { useState } from 'react';
import { 
  X, 
  User, 
  Key, 
  ShieldCheck, 
  Mail, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Globe, 
  Building2, 
  Check, 
  RefreshCw,
  FileText,
  Send,
  PlusCircle,
  Lock,
  Shield,
  Loader2
} from 'lucide-react';
import { UserProfile, PendingPayment } from '../types';

interface UserAccountModalProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  user,
  setUser,
  onClose,
  isDarkMode,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED'>('ALL');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // New Payment Submission Flow State
  const [showSubmitForm, setShowSubmitForm] = useState(true);
  const [selectedGateway, setSelectedGateway] = useState('Airtm Global e-Wallet');
  const [selectedPlan, setSelectedPlan] = useState('Pro Plan (10,000 Credits)');
  const [amount, setAmount] = useState('19');
  const [senderEmail, setSenderEmail] = useState(user.email || 'razjnava@gmail.com');
  const [transactionNote, setTransactionNote] = useState('');

  // OTP Verification State
  const [otpCode, setOtpCode] = useState('894201');
  const [otpSending, setOtpSending] = useState(false);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [itemOtpInput, setItemOtpInput] = useState<Record<string, string>>({});

  const payments = user.pendingPayments || [];

  const handleSendOtp = () => {
    if (!senderEmail || !senderEmail.includes('@')) {
      setOtpError('Please enter a valid sender email address first.');
      return;
    }
    setOtpSending(true);
    setOtpError(null);
    setOtpNotice(null);
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setOtpCode(code);
      setOtpSending(false);
      setOtpNotice(`Authorization OTP code ${code} sent to ${senderEmail}! Enter code and click 'Verify'.`);
    }, 800);
  };

  const handleVerifyAndSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setOtpError(null);
    setOtpNotice(null);

    if (!senderEmail || !senderEmail.includes('@')) {
      setOtpError('Please enter a valid sender email address.');
      return;
    }

    if (!otpCode || otpCode.trim().length < 6) {
      setOtpError('Please enter a valid 6-digit authorization OTP code.');
      return;
    }

    setSubmittingPayment(true);

    setTimeout(() => {
      const generatedReceipt = `UVD-${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPayment: PendingPayment = {
        id: `pay-${Date.now()}`,
        gateway: selectedGateway,
        planOrPack: selectedPlan,
        amount: Number(amount) || 19,
        senderEmail,
        senderName: user.name || 'Account Holder',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'Pending Verification',
        transactionNote: transactionNote || `${selectedGateway} Transfer Ref`,
        receiptId: generatedReceipt,
        otpAuthorized: true,
        otpCode: otpCode,
      };

      setUser((prev) => ({
        ...prev,
        pendingPayments: [newPayment, ...(prev.pendingPayments || [])],
      }));

      setSubmittingPayment(false);
      setOtpNotice(`Payment verified via OTP code (${otpCode}) and submitted successfully!`);
      setTransactionNote('');
      
      setTimeout(() => {
        setOtpNotice(null);
      }, 4000);
    }, 1000);
  };

  const handleVerifyPendingItemOtp = (paymentId: string) => {
    const code = itemOtpInput[paymentId] || '894201';
    if (!code || code.trim().length < 6) {
      alert('Please enter a valid 6-digit OTP code.');
      return;
    }

    setUser((prev) => ({
      ...prev,
      pendingPayments: (prev.pendingPayments || []).map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            otpAuthorized: true,
            otpCode: code,
          };
        }
        return p;
      }),
    }));
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleOAuthLogin = (provider: string) => {
    alert(`Connected account with ${provider}!`);
  };

  // Simulate Administrator verifying a pending payment
  const handleSimulateVerify = (paymentId: string) => {
    setVerifyingId(paymentId);
    setTimeout(() => {
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

        // Grant 2,500 credits as default or parse credit amount if available
        const creditsToGrant = target.planOrPack.includes('10,000') ? 10000 : 2500;

        return {
          ...prev,
          aiCreditsRemaining: prev.aiCreditsRemaining + creditsToGrant,
          totalCredits: prev.totalCredits + creditsToGrant,
          pendingPayments: updatedPayments,
        };
      });
      setVerifyingId(null);
    }, 1200);
  };

  const pendingCount = payments.filter((p) => p.status === 'Pending Verification').length;
  const verifiedCount = payments.filter((p) => p.status === 'Verified').length;

  const filteredPayments = payments.filter((p) => {
    if (paymentFilter === 'PENDING') return p.status === 'Pending Verification';
    if (paymentFilter === 'VERIFIED') return p.status === 'Verified';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-2xl my-auto p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#0F172A] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white text-xl font-extrabold shadow-lg shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-extrabold text-lg">{user.name}</h3>
            <p className="text-xs text-slate-400">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {user.plan} Plan
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Member
              </span>
            </div>
          </div>
        </div>

        {/* AI Credits Overview */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 block font-medium">Remaining AI Credits</span>
            <strong className="text-lg font-extrabold text-indigo-400">
              {user.aiCreditsRemaining.toLocaleString()} / {user.totalCredits.toLocaleString()}
            </strong>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-[11px] shadow-sm">
            Auto-renews monthly
          </span>
        </div>

        {/* Pending & Manual Payment Status Tracker */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Pending Payments & Manual Email Transfers</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Tracks manual transfers (Airtm, PayPal, Wise) awaiting administrator verification.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSubmitForm(!showSubmitForm)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{showSubmitForm ? 'Hide Form' : 'Submit Transaction'}</span>
              </button>

              {/* Pending Badge */}
              {pendingCount > 0 ? (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 shrink-0 animate-pulse">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{pendingCount} Pending</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              )}
            </div>
          </div>

          {/* New Payment Submission Flow Form */}
          {showSubmitForm && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-3.5 text-xs shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-extrabold text-indigo-300 flex items-center gap-1.5 text-xs">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Submit Transaction Details for Verification</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Step 1 & 2: Details + OTP</span>
              </div>

              {/* Transaction Details Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Payment Gateway / e-Wallet</label>
                  <select
                    value={selectedGateway}
                    onChange={(e) => setSelectedGateway(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-bold text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Airtm Global e-Wallet">Airtm Global e-Wallet</option>
                    <option value="PayPal Express Transfer">PayPal Express Transfer</option>
                    <option value="Wise / Payoneer">Wise / Payoneer Direct</option>
                    <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Plan / Credit Pack</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => {
                      setSelectedPlan(e.target.value);
                      if (e.target.value.includes('Pro')) setAmount('19');
                      else if (e.target.value.includes('Agency')) setAmount('49');
                      else setAmount('29');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-bold text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Pro Plan (10,000 Credits)">Pro Plan ($19 / 10,000 Credits)</option>
                    <option value="Agency Plan (30,000 Credits)">Agency Plan ($49 / 30,000 Credits)</option>
                    <option value="Credit Refill Pack (15,000 Credits)">Credit Refill ($29 / 15,000 Credits)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Sender Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-950 border border-white/10 text-indigo-300 font-mono text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Transaction Ref / PIN / Note</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={transactionNote}
                      onChange={(e) => setTransactionNote(e.target.value)}
                      placeholder="Ref #AIR-88912 or Transfer PIN"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Triggered OTP Input Field & Verify Button Section */}
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2.5 mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-indigo-500/20 pb-1.5">
                  <span className="font-bold text-indigo-200 flex items-center gap-1.5 text-xs">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <span>Sender Identity OTP Verification</span>
                  </span>
                  <span className="text-[10px] text-indigo-300">
                    Authorize sender email ({senderEmail || 'required'})
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-Digit OTP Code"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono font-extrabold text-emerald-400 tracking-widest focus:outline-none focus:border-indigo-500"
                    />
                    <Key className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSending}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                  >
                    {otpSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send OTP</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVerifyAndSubmit()}
                    disabled={submittingPayment}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                  >
                    {submittingPayment ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify & Submit Payment</span>
                      </>
                    )}
                  </button>
                </div>

                {otpError && (
                  <div className="text-[11px] text-red-400 font-semibold flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                {otpNotice && (
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{otpNotice}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 text-xs font-bold pt-1">
            <button
              onClick={() => setPaymentFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                paymentFilter === 'ALL'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              All ({payments.length})
            </button>
            <button
              onClick={() => setPaymentFilter('PENDING')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                paymentFilter === 'PENDING'
                  ? 'bg-amber-500 text-slate-950 font-extrabold'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Pending ({pendingCount})</span>
            </button>
            <button
              onClick={() => setPaymentFilter('VERIFIED')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                paymentFilter === 'VERIFIED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified ({verifiedCount})</span>
            </button>
          </div>

          {/* Payment List */}
          <div className="space-y-3 pt-1">
            {filteredPayments.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center text-xs text-slate-400 space-y-1">
                <p>No payment records found matching this filter.</p>
              </div>
            ) : (
              filteredPayments.map((payment) => {
                const isPending = payment.status === 'Pending Verification';
                const isVerified = payment.status === 'Verified';

                return (
                  <div
                    key={payment.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      isPending
                        ? 'bg-amber-500/5 border-amber-500/30 ring-1 ring-amber-500/20'
                        : isVerified
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-red-500/5 border-red-500/20'
                    }`}
                  >
                    {/* Item Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl text-white font-bold ${
                          payment.gateway.includes('Airtm') 
                            ? 'bg-teal-600' 
                            : payment.gateway.includes('PayPal') 
                              ? 'bg-blue-600' 
                              : 'bg-indigo-600'
                        }`}>
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-extrabold text-white block">
                            {payment.gateway}
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Ref: {payment.receiptId}
                          </span>
                        </div>
                      </div>

                      {/* Status Indicator Badge */}
                      <div className="flex items-center gap-2">
                        {isPending && (
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Admin Verification</span>
                          </span>
                        )}
                        {isVerified && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified & Credits Issued</span>
                          </span>
                        )}
                        {payment.status === 'Rejected' && (
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-bold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Payment Rejected</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Payment Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Plan / Item</span>
                        <strong className="text-white text-[11px] truncate block">{payment.planOrPack}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Amount</span>
                        <strong className="text-emerald-400 font-extrabold text-[12px]">${payment.amount}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Sender Email</span>
                        <strong className="text-indigo-300 font-mono text-[10px] truncate block">{payment.senderEmail}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Date Submitted</span>
                        <strong className="text-slate-300 text-[10px] block">{payment.date}</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {payment.transactionNote && (
                        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-300 font-mono flex items-center gap-1.5 flex-1 min-w-[200px]">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{payment.transactionNote}</span>
                        </div>
                      )}

                      {payment.otpAuthorized ? (
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Sender OTP Auth: {payment.otpCode || 'Verified'}</span>
                        </div>
                      ) : (
                        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <span className="font-bold flex items-center gap-1">
                            <Key className="w-3.5 h-3.5 text-amber-400" />
                            <span>OTP:</span>
                          </span>
                          <input
                            type="text"
                            value={itemOtpInput[payment.id] || ''}
                            onChange={(e) => setItemOtpInput({ ...itemOtpInput, [payment.id]: e.target.value })}
                            placeholder="6-digit OTP code"
                            className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-emerald-400 font-mono font-bold text-[11px] w-28 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleVerifyPendingItemOtp(payment.id)}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Verify</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Simulate Verification Button for testing */}
                    {isPending && (
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/5">
                        <p className="text-[10px] text-slate-400">
                          Awaiting administrator review. Transfers are checked against receiving account statement.
                        </p>
                        <button
                          onClick={() => handleSimulateVerify(payment.id)}
                          disabled={verifyingId === payment.id}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                        >
                          {verifyingId === payment.id ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Simulate Admin Verification</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* OAuth Social Login Buttons */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
            Linked Social Accounts:
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            <button
              onClick={() => handleOAuthLogin('Google')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Google</span>
            </button>
            <button
              onClick={() => handleOAuthLogin('GitHub')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>GitHub</span>
            </button>
            <button
              onClick={() => handleOAuthLogin('Apple')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Apple ID</span>
            </button>
          </div>
        </div>

        {/* Developer API Key */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Key className="w-4 h-4 text-indigo-400" /> API Secret Key
            </span>
            <button
              onClick={handleCopyKey}
              className="text-indigo-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-emerald-400 text-[11px] truncate">
            {user.apiKey}
          </div>
        </div>
      </div>
    </div>
  );
};
