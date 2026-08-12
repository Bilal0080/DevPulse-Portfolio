import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, Search, Download, Filter, FileText } from 'lucide-react';

export const AuditLogModal: React.FC = () => {
  const { auditLogs, setAuditModalOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DevPulse_Audit_Logs_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        <button
          onClick={() => setAuditModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Compliance & System Audit Trail
              </h3>
              <p className="text-xs text-slate-500">Immutable client and system event security log</p>
            </div>
          </div>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit JSON</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search actions, actors, IP..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">Severity:</span>
            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="security">Security</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Actor / Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      log.severity === 'security'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        : log.severity === 'warning'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">{log.actor}</td>
                  <td className="p-3 font-mono font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">{log.action}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 leading-normal">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
