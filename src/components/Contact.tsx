import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Building,
  DollarSign
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { sendContactMessage, t } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Platform');
  const [budgetRange, setBudgetRange] = useState('$10,000 - $25,000');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const projectTypes = [
    'Full-Stack Platform',
    'AI & Gemini Integration',
    'Low-Latency Telemetry',
    'Systems Architecture',
    'Technical Advisory'
  ];

  const budgetRanges = [
    '< $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      sendContactMessage({
        name,
        email,
        subject: subject || projectType,
        projectType,
        budgetRange,
        message
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 800);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t('contactTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-6">
          
          {submittedSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Message Transmitted
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {t('messageSentSuccess')} An auto-responder email acknowledgment has been logged in system telemetry.
              </p>
              <button
                onClick={() => setSubmittedSuccess(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('nameLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('emailLabel')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('subjectLabel')}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Architecture Audit or New Platform Build"
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Project Type Selector Pills */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('projectTypeLabel')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        projectType === type
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('budgetLabel')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetRanges.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudgetRange(range)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono text-center transition-all ${
                        budgetRange === range
                          ? 'border-2 border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('messageLabel')} *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Outline your timeline, core requirements, and technical goals..."
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity shadow-sm"
              >
                {isSubmitting ? (
                  <span>{t('sendingMessage')}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('sendMessage')}</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

        {/* Right Info Box (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">
              Direct Channels
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Email Address</p>
                  <p className="text-slate-500 dark:text-slate-400 font-mono">contact@devpulse.io</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Response Window</p>
                  <p className="text-slate-500 dark:text-slate-400">Within 12 Hours (Mon-Fri)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Base Location</p>
                  <p className="text-slate-500 dark:text-slate-400">San Francisco, CA (UTC-7)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GDPR & CCPA Compliant Transport</span>
              </p>
              <p>All transmitted forms are encrypted using standard TLS protocol.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
