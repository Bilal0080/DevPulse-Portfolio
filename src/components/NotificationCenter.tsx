import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map(notif => (
        <div
          key={notif.id}
          className="pointer-events-auto flex items-start justify-between p-3.5 rounded-xl border bg-slate-900/95 dark:bg-slate-900/95 text-white shadow-xl backdrop-blur-md border-slate-800 space-x-3 transition-all animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="flex items-start gap-2.5">
            {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {notif.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
            {notif.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {notif.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}

            <div className="space-y-0.5">
              <h4 className="text-xs font-bold font-mono tracking-tight text-white">{notif.title}</h4>
              <p className="text-[11px] text-slate-300 leading-snug">{notif.message}</p>
              <span className="text-[9px] text-slate-500 font-mono block">{notif.timestamp}</span>
            </div>
          </div>

          <button
            onClick={() => removeNotification(notif.id)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
