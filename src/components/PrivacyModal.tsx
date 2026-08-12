import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, Download, Trash2, CheckCircle2 } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { gdprAccepted, setGdprAccepted, setGdprModalOpen, user, contactMessages } = useApp();

  const [essentialCookies, setEssentialCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = () => {
    setGdprAccepted(analyticsCookies);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setGdprModalOpen(false);
    }, 1200);
  };

  const handleExportUserData = () => {
    const dataObj = {
      userProfile: user,
      privacySettings: {
        essentialCookies,
        analyticsCookies,
        functionalCookies,
        gdprAccepted
      },
      submittedInquiries: contactMessages.filter(m => m.email === user?.email),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DevPulse_GDPR_UserData_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <button
          onClick={() => setGdprModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Privacy & Data Protection (GDPR / CCPA)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Control your telemetry privacy preferences and exercise your Data Subject Rights.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Preferences updated and logged in security ledger.</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Essential Security Storage</h4>
              <p className="text-[11px] text-slate-500">Required for authentication session & dark mode state</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
              ALWAYS ACTIVE
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Telemetry & Performance Analytics</h4>
              <p className="text-[11px] text-slate-500">Anonymous session duration & core web vitals</p>
            </div>
            <input
              type="checkbox"
              checked={analyticsCookies}
              onChange={e => setAnalyticsCookies(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Functional Preferences</h4>
              <p className="text-[11px] text-slate-500">Multi-language dictionary selection & blog bookmarks</p>
            </div>
            <input
              type="checkbox"
              checked={functionalCookies}
              onChange={e => setFunctionalCookies(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Data Subject Rights (Export / Anonymize) */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
            Data Subject Rights
          </h4>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleExportUserData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span>Export My Personal Data</span>
            </button>

            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs shadow-sm"
            >
              Save Preferences
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
