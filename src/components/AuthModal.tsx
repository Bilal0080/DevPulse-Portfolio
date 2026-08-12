import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import {
  X,
  Lock,
  Shield,
  ShieldAlert,
  User,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, mfaPending, setMfaPending, t } = useApp();

  const [selectedRole, setSelectedRole] = useState<Role>('admin');
  const [mfaCode, setMfaCode] = useState<string>('123456');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (selectedRole === 'admin' && !mfaPending) {
      setMfaPending(true);
      return;
    }

    const success = login(selectedRole, selectedRole === 'admin' ? mfaCode : undefined);
    if (success) {
      onClose();
    } else {
      setErrorMsg('MFA Verification Failed. Invalid security code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <button
          onClick={() => {
            setMfaPending(false);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {mfaPending ? t('mfaVerification') : 'Security Access Console'}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {mfaPending
              ? t('mfaSubtitle')
              : 'Select role to authenticate into DevPulse architecture.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {!mfaPending ? (
            <div className="space-y-3">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Select Security Context Role
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-4 rounded-xl border text-left space-y-1.5 transition-all ${
                    selectedRole === 'admin'
                      ? 'border-2 border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ShieldAlert className="w-5 h-5" />
                  <div className="font-bold text-xs">Admin / Developer</div>
                  <p className="text-[10px] opacity-80">Full access to Analytics, Blog Editor, Alerts & Audit Logs</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('visitor')}
                  className={`p-4 rounded-xl border text-left space-y-1.5 transition-all ${
                    selectedRole === 'visitor'
                      ? 'border-2 border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <div className="font-bold text-xs">Guest Visitor</div>
                  <p className="text-[10px] opacity-80">Read-only portfolio, blog reader, & contact form</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-bold text-amber-600 dark:text-amber-400">Demo Security Token Hint:</p>
                <p>Use code <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-bold text-slate-900 dark:text-white">123456</code> or <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-bold text-slate-900 dark:text-white">888888</code></p>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  6-Digit MFA Token
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={mfaCode}
                    onChange={e => setMfaCode(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm font-mono font-bold tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            {mfaPending && (
              <button
                type="button"
                onClick={() => setMfaPending(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold shadow-sm"
            >
              {mfaPending ? t('verifyAndProceed') : 'Continue to Auth'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
