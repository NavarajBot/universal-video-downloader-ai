import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { HELP_ARTICLES } from '../data/mockData';

interface HelpCenterProps {
  isDarkMode?: boolean;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('h1');
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketText, setTicketText] = useState('');

  const filteredFaqs = HELP_ARTICLES.filter(
    (h) =>
      h.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketText.trim()) return;
    setTicketSent(true);
    setTicketText('');
    setTimeout(() => setTicketSent(false), 3000);
  };

  return (
    <section className="py-10 space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base & Support</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Help Center & Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Find answers regarding video format compatibility, AI transcripts, copyright compliance, and subscription billing.
        </p>

        {/* Search */}
        <div className="relative max-w-lg mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles (e.g., copyright, formats, 4K)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs outline-none focus:border-indigo-500 shadow-lg"
          />
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isOpen && (
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Ticket Form */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-indigo-100'
      }`}>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Still Have Questions? Send Support Ticket</h3>
        </div>

        {ticketSent ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Support ticket submitted! Our team will respond within 2 hours.
          </div>
        ) : (
          <form onSubmit={handleSendTicket} className="space-y-3">
            <textarea
              value={ticketText}
              onChange={(e) => setTicketText(e.target.value)}
              placeholder="Describe your question or feature request..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit Support Ticket
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
