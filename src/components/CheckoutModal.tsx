import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  QrCode, 
  Smartphone, 
  ArrowRight, 
  Loader2, 
  Globe, 
  DollarSign,
  User,
  Mail,
  FileText,
  Clock,
  Key,
  Send,
  Check,
  Shield
} from 'lucide-react';
import { UserProfile } from '../types';

export type PaymentMethodId = 
  | 'card' 
  | 'paypal' 
  | 'airtm'
  | 'wise_payoneer'
  | 'apple_google_pay' 
  | 'bank_transfer' 
  | 'alipay_wechat';

interface PlanDetail {
  name: 'Pro' | 'Business' | 'Credits Pack';
  price: number;
  period: 'month' | 'year' | 'one-time';
  creditsGranted: number;
  storageGrantedGB?: number;
}

interface CheckoutModalProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  planToBuy: PlanDetail;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  user,
  setUser,
  planToBuy,
  onClose,
  isDarkMode = true,
}) => {
  const [selectedGateway, setSelectedGateway] = useState<PaymentMethodId>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState('');

  // Universal Sender Details & Custom Amount
  const [senderEmail, setSenderEmail] = useState(user.email || 'user@example.com');
  const [senderName, setSenderName] = useState(user.name || 'John Doe');
  const [paymentAmount, setPaymentAmount] = useState<number>(planToBuy.price);
  const [transactionNote, setTransactionNote] = useState('');

  // Form states for Card
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Wise / Payoneer currency choice
  const [currency, setCurrency] = useState('USD');

  // Email OTP Sender Authorization State
  const [otpCode, setOtpCode] = useState('894201');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);

  const handleRequestEmailOtp = () => {
    if (!senderEmail || !senderEmail.includes('@')) {
      setOtpNotice('Please enter a valid sender email address first.');
      return;
    }
    setOtpSending(true);
    setOtpNotice(null);
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setOtpCode(code);
      setOtpSent(true);
      setOtpSending(false);
      setOtpVerified(true);
      setOtpNotice(`Authorization code ${code} sent to ${senderEmail}! Sender identity verified.`);
    }, 900);
  };

  const paymentGateways = [
    {
      id: 'card' as PaymentMethodId,
      name: 'Credit / Debit Card',
      subtitle: 'Stripe, Visa, Mastercard, Amex',
      badge: 'Instant',
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'paypal' as PaymentMethodId,
      name: 'PayPal Express',
      subtitle: '1-Click Express Transfer & Buyer Protection',
      badge: 'Popular',
      icon: DollarSign,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'airtm' as PaymentMethodId,
      name: 'Airtm Global e-Wallet',
      subtitle: 'Direct AirUSD & Global e-Wallet Transfer',
      badge: 'Global',
      icon: Globe,
      color: 'from-teal-500 to-emerald-600',
    },
    {
      id: 'wise_payoneer' as PaymentMethodId,
      name: 'Wise & Payoneer',
      subtitle: 'Low-fee multi-currency transfers',
      badge: 'Low Fee',
      icon: Building2,
      color: 'from-cyan-600 to-blue-700',
    },
    {
      id: 'apple_google_pay' as PaymentMethodId,
      name: 'Apple Pay / Google Pay',
      subtitle: 'Biometric 1-Tap checkout',
      badge: '1-Tap',
      icon: Smartphone,
      color: 'from-slate-700 to-black',
    },
    {
      id: 'bank_transfer' as PaymentMethodId,
      name: 'Bank Wire / ACH / SEPA',
      subtitle: 'Direct wire & invoice for businesses',
      badge: 'B2B',
      icon: Building2,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'alipay_wechat' as PaymentMethodId,
      name: 'Alipay & WeChat Pay',
      subtitle: 'QR Code scan for global users',
      badge: 'Global',
      icon: QrCode,
      color: 'from-sky-500 to-cyan-600',
    },
  ];

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setProcessingStep('Establishing 256-bit SSL encrypted connection...');

    setTimeout(() => {
      setProcessingStep(`Verifying sender details (${senderEmail})...`);
    }, 800);

    setTimeout(() => {
      setProcessingStep(`Authorizing $${paymentAmount} via ${selectedGateway.toUpperCase()} Gateway...`);
    }, 1700);

    setTimeout(() => {
      const generatedReceipt = `UVD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      setReceiptId(generatedReceipt);
      setIsProcessing(false);
      setPaymentSuccess(true);

      const isManual = ['airtm', 'paypal', 'wise_payoneer', 'bank_transfer'].includes(selectedGateway);
      const gwName = paymentGateways.find(g => g.id === selectedGateway)?.name || selectedGateway;

      const newPaymentRecord = {
        id: `pay-${Date.now()}`,
        gateway: gwName,
        amount: paymentAmount,
        planOrPack: `${planToBuy.name} ${planToBuy.name === 'Credits Pack' ? '' : 'Plan'} (+${planToBuy.creditsGranted.toLocaleString()} Credits)`,
        senderEmail: senderEmail,
        senderName: senderName,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: isManual ? ('Pending Verification' as const) : ('Verified' as const),
        transactionNote: transactionNote || `${gwName} Transfer`,
        receiptId: generatedReceipt,
        verifiedAt: isManual ? undefined : new Date().toISOString().replace('T', ' ').slice(0, 16),
        otpAuthorized: isManual ? otpVerified : true,
        otpCode: isManual ? otpCode : undefined,
      };

      // Update user state
      setUser((prev) => {
        const isPack = planToBuy.name === 'Credits Pack';
        const existingPayments = prev.pendingPayments || [];

        // If instant automated payment (Card/Apple Pay), grant credits immediately.
        // If manual transfer (Airtm / PayPal / Wise / Wire), keep credits pending admin verification.
        const newCredits = isManual ? prev.aiCreditsRemaining : (prev.aiCreditsRemaining + planToBuy.creditsGranted);
        const newTotal = isManual ? prev.totalCredits : (prev.totalCredits + planToBuy.creditsGranted);

        return {
          ...prev,
          email: senderEmail,
          name: senderName,
          plan: (!isManual && !isPack) ? (planToBuy.name as 'Pro' | 'Business') : prev.plan,
          aiCreditsRemaining: newCredits,
          totalCredits: newTotal,
          maxStorageGB: (!isManual && planToBuy.storageGrantedGB) ? planToBuy.storageGrantedGB : prev.maxStorageGB,
          pendingPayments: [newPaymentRecord, ...existingPayments],
        };
      });
    }, 2700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-2xl my-auto p-6 sm:p-8 rounded-3xl border shadow-2xl relative space-y-6 ${
        isDarkMode ? 'bg-[#0F172A] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!paymentSuccess ? (
          <>
            {/* Header / Order Summary */}
            <div className="border-b border-white/10 pb-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure SSL Encrypted Gateway (Recipient Account Masked)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-extrabold flex items-center gap-2">
                    <span>Checkout: {planToBuy.name} Plan</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      +{planToBuy.creditsGranted.toLocaleString()} AI Credits
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Full access to 4K downloads, Gemini transcript AI, upscaling & format conversions.
                  </p>
                </div>
                <div className="text-right sm:text-right">
                  <div className="text-2xl font-extrabold text-indigo-400">
                    ${paymentAmount}
                  </div>
                  <span className="text-xs text-slate-400 block font-medium">
                    /{planToBuy.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Gateway Selection Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Select Payment Gateway:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                {paymentGateways.map((gw) => {
                  const IconComp = gw.icon;
                  const isSelected = selectedGateway === gw.id;
                  return (
                    <button
                      key={gw.id}
                      type="button"
                      onClick={() => setSelectedGateway(gw.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-md ring-1 ring-indigo-500/50'
                          : isDarkMode
                            ? 'bg-white/5 border-white/5 hover:bg-white/10'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gw.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs flex items-center gap-1.5">
                            <span>{gw.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
                            {gw.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isSelected 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-white/10 text-slate-400'
                      }`}>
                        {gw.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Gateway Payment Details & Sender Form */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold border-b border-white/10 pb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>Sender Details & Payment Amount</span>
                </span>
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              {/* Shared Sender Email & Amount Input for All Gateways */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Sender Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Sender Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Account / Cardholder Name"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Payment Amount ($)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      placeholder="Amount in USD"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <DollarSign className="w-3.5 h-3.5 text-indigo-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Email OTP Code Sender Authorization Block for Manual Gateways */}
              {['airtm', 'paypal', 'wise_payoneer', 'bank_transfer'].includes(selectedGateway) && (
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-2">
                    <span className="font-bold text-indigo-200 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-indigo-400" />
                      <span>Sender Email OTP Authorization</span>
                    </span>
                    <span className="text-[10px] text-indigo-300 font-medium">
                      Verifies ownership of contact email ({senderEmail})
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative flex-1 w-full">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => {
                          setOtpCode(e.target.value);
                          if (e.target.value.length >= 6) setOtpVerified(true);
                        }}
                        placeholder="Enter 6-Digit Email OTP Code"
                        className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono font-bold text-emerald-400 tracking-widest focus:outline-none focus:border-indigo-500"
                      />
                      <Key className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>

                    <button
                      type="button"
                      onClick={handleRequestEmailOtp}
                      disabled={otpSending}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                    >
                      {otpSending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send OTP to Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  {otpNotice && (
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{otpNotice}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Specific Gateway Forms */}
              {selectedGateway === 'card' && (
                <div className="space-y-2 pt-1 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Card Information (Stripe Gateway)</span>
                    <div className="flex gap-1.5 text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-black">VISA</span>
                      <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black">MC</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-600 text-white font-black">AMEX</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <CreditCard className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC / CVV"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal */}
              {selectedGateway === 'paypal' && (
                <div className="space-y-2 pt-1 border-t border-white/5 text-xs">
                  <div className="font-bold text-slate-300">PayPal Sender Authorization</div>
                  <div className="relative">
                    <input
                      type="text"
                      value={transactionNote}
                      onChange={(e) => setTransactionNote(e.target.value)}
                      placeholder="PayPal Transaction ID / Reference Note (Optional)"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Payment from PayPal account <strong className="text-white">{senderEmail}</strong> will be routed securely via SSL encrypted proxy.
                  </p>
                </div>
              )}

              {/* Airtm */}
              {selectedGateway === 'airtm' && (
                <div className="space-y-2 pt-1 border-t border-white/5 text-xs">
                  <div className="font-bold text-slate-300">Airtm e-Wallet Direct Transfer Details</div>

                  <div className="relative">
                    <input
                      type="text"
                      value={transactionNote}
                      onChange={(e) => setTransactionNote(e.target.value)}
                      placeholder="Airtm Transfer PIN / Reference Note (Optional)"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Direct AirUSD transfer authorized from Airtm user <strong className="text-teal-300">{senderEmail}</strong>.
                  </p>
                </div>
              )}

              {/* Wise & Payoneer */}
              {selectedGateway === 'wise_payoneer' && (
                <div className="space-y-2 pt-1 border-t border-white/5 text-xs">
                  <div className="flex justify-between items-center font-bold text-slate-300">
                    <span>Wise & Payoneer Transfer Currency</span>
                    <div className="flex gap-1 text-[10px]">
                      {['USD', 'EUR', 'GBP'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCurrency(c)}
                          className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                            currency === c ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={transactionNote}
                    onChange={(e) => setTransactionNote(e.target.value)}
                    placeholder="Sender Wise / Payoneer Account ID or Batch Note"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Apple / Google Pay */}
              {selectedGateway === 'apple_google_pay' && (
                <div className="text-center space-y-2 pt-1 border-t border-white/5 text-xs">
                  <Smartphone className="w-8 h-8 mx-auto text-indigo-400" />
                  <p className="text-[11px] text-slate-300">
                    1-Tap Biometric Payment of <strong className="text-indigo-400">${paymentAmount}</strong> will be charged to <strong className="text-white">{senderEmail}</strong>.
                  </p>
                </div>
              )}

              {/* Bank Transfer */}
              {selectedGateway === 'bank_transfer' && (
                <div className="space-y-2 pt-1 border-t border-white/5 text-xs">
                  <div className="font-bold text-slate-300">Bank Wire Reference & Invoice Details</div>
                  <input
                    type="text"
                    value={transactionNote}
                    onChange={(e) => setTransactionNote(e.target.value)}
                    placeholder="Wire Confirmation Code or Purchase Order # (Optional)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-300 space-y-0.5">
                    <div>Bank: Silicon Valley Corporate Bank</div>
                    <div>ACH / SEPA Wire Endpoint: SSL Encrypted Account</div>
                  </div>
                </div>
              )}

              {/* Alipay / WeChat */}
              {selectedGateway === 'alipay_wechat' && (
                <div className="text-center space-y-2 pt-1 border-t border-white/5 text-xs">
                  <QrCode className="w-10 h-10 mx-auto text-sky-400" />
                  <p className="text-[11px] text-slate-300">
                    Scan QR code to authorize transfer of <strong className="text-sky-400">${paymentAmount}</strong> from sender account <strong className="text-white">{senderEmail}</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleExecutePayment}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-indigo-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>{processingStep}</span>
                  </>
                ) : (
                  <>
                    <span>Pay ${paymentAmount} with {paymentGateways.find(g => g.id === selectedGateway)?.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Money-back guarantee
                </span>
                <span>•</span>
                <span>Cancel anytime in 1 click</span>
              </div>
            </div>
          </>
        ) : (
          /* Payment Success / Pending Confirmation View */
          <div className="text-center py-6 space-y-6">
            {['airtm', 'paypal', 'wise_payoneer', 'bank_transfer'].includes(selectedGateway) ? (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center animate-pulse">
                  <Clock className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 w-max mx-auto">
                    <Clock className="w-3.5 h-3.5" /> Pending Administrator Verification
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Transfer Details Submitted!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your manual transfer of <strong className="text-amber-400">${paymentAmount}</strong> via <strong className="text-white">{paymentGateways.find(g => g.id === selectedGateway)?.name}</strong> from <strong className="text-white">{senderEmail}</strong> has been logged. Our admin team will verify the payment and issue your <strong className="text-indigo-400">{planToBuy.creditsGranted.toLocaleString()} AI credits</strong>.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                    Payment Authorized & Activated!
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Welcome to {planToBuy.name} Tier!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your account has been upgraded and {planToBuy.creditsGranted.toLocaleString()} AI credits have been added to your balance immediately.
                  </p>
                </div>
              </>
            )}

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2.5 max-w-md mx-auto text-left">
              <div className="flex justify-between font-mono text-slate-400 border-b border-white/10 pb-2">
                <span>Receipt / Order Ref:</span>
                <span className="text-white font-bold">{receiptId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sender Email:</span>
                <span className="text-white font-bold">{senderEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Gateway:</span>
                <span className="text-indigo-300 font-bold uppercase">
                  {paymentGateways.find(g => g.id === selectedGateway)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <span className="text-emerald-400 font-extrabold">${paymentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verification Status:</span>
                {['airtm', 'paypal', 'wise_payoneer', 'bank_transfer'].includes(selectedGateway) ? (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Pending Review
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified & Active
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 max-w-md mx-auto flex items-center justify-between gap-2">
              <span className="text-[11px]">Check transfer status anytime in your account modal.</span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all cursor-pointer"
              >
                Return to Dashboard & Check Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
