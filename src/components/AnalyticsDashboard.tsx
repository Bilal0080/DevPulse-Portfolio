import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportAnalyticsPDF, exportMetricsCSV } from '../utils/pdfExporter';
import { REGIONAL_TRAFFIC } from '../data/initialData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  BarChart3,
  Download,
  FileText,
  Activity,
  Cpu,
  Globe,
  Bell,
  Shield,
  Zap,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const {
    engagementMetrics,
    systemMetric,
    auditLogs,
    alertRules,
    toggleAlertRule,
    contactMessages,
    user
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'telemetry' | 'alerts'>('overview');

  const totalPageViews = engagementMetrics.reduce((acc, m) => acc + m.pageViews, 0);
  const totalVisitors = engagementMetrics.reduce((acc, m) => acc + m.uniqueVisitors, 0);
  const totalBlogReads = engagementMetrics.reduce((acc, m) => acc + m.blogReads, 0);
  const totalInquiries = contactMessages.length;

  const handlePDFExport = () => {
    exportAnalyticsPDF(engagementMetrics, systemMetric, auditLogs, contactMessages);
  };

  const handleCSVExport = () => {
    exportMetricsCSV(engagementMetrics);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header & Export CTAs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Real-Time Telemetry & Insights
            </span>
            <span className="text-xs font-mono text-slate-500">p99 &lt; 18ms</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Engagement & Performance Console
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Live client activity metrics, core web vitals breakdown, regional traffic distribution, and automated alert rules.
          </p>
        </div>

        {/* PDF / CSV Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePDFExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF Report</span>
          </button>

          <button
            onClick={handleCSVExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-3 px-3 text-xs font-semibold font-mono border-b-2 transition-colors ${
            activeSubTab === 'overview'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          Engagement Overview
        </button>
        <button
          onClick={() => setActiveSubTab('telemetry')}
          className={`pb-3 px-3 text-xs font-semibold font-mono border-b-2 transition-colors ${
            activeSubTab === 'telemetry'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          Core Web Vitals & Hardware
        </button>
        <button
          onClick={() => setActiveSubTab('alerts')}
          className={`pb-3 px-3 text-xs font-semibold font-mono border-b-2 transition-colors ${
            activeSubTab === 'alerts'
              ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          Customizable Alert Rules ({alertRules.filter(r => r.enabled).length})
        </button>
      </div>

      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          
          {/* 4 Summary KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Page Views (7d)</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                {totalPageViews.toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                +18.4% vs previous week
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Unique Visitors</span>
                <Activity className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                {totalVisitors.toLocaleString()}
              </div>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                82.1% direct & organic
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Blog Article Reads</span>
                <BarChart3 className="w-3.5 h-3.5 text-violet-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                {totalBlogReads.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Avg 4.8 min read time
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Inquiries Lead</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                {totalInquiries}
              </div>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                High conversion velocity
              </p>
            </div>

          </div>

          {/* Time Series Area Chart */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  Traffic Trend & Session Volume
                </h3>
                <p className="text-xs text-slate-500">Daily pageviews compared to unique visitor sessions over 7 days</p>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="pageViews" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" name="Page Views" />
                  <Area type="monotone" dataKey="uniqueVisitors" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" name="Unique Visitors" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Traffic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Geographic Traffic Distribution</span>
              </h3>

              <div className="space-y-3 pt-2">
                {REGIONAL_TRAFFIC.map(item => (
                  <div key={item.code} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-800 dark:text-slate-200">{item.country}</span>
                      <span className="text-slate-500">{item.visitors.toLocaleString()} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquiries Lead Queue Preview */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Incoming Technical Inquiries ({contactMessages.length})</span>
              </h3>

              <div className="space-y-3">
                {contactMessages.map(msg => (
                  <div
                    key={msg.id}
                    className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{msg.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">{msg.subject}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">{msg.projectType}</span>
                      <span>{msg.budgetRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {activeSubTab === 'telemetry' && (
        <div className="space-y-6">
          
          {/* Lighthouse Score Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-2">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center font-mono font-extrabold text-xl text-emerald-600 dark:text-emerald-400">
                {systemMetric.lighthousePerformance}
              </div>
              <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">Performance</h4>
              <p className="text-[11px] text-slate-500">First Contentful Paint 0.4s</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-2">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center font-mono font-extrabold text-xl text-emerald-600 dark:text-emerald-400">
                {systemMetric.lighthouseAccessibility}
              </div>
              <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">Accessibility</h4>
              <p className="text-[11px] text-slate-500">WCAG 2.1 AA Compliant</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-2">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center font-mono font-extrabold text-xl text-emerald-600 dark:text-emerald-400">
                {systemMetric.lighthouseBestPractices}
              </div>
              <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">Best Practices</h4>
              <p className="text-[11px] text-slate-500">Modern TLS & Strict CSP</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-2">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 mx-auto flex items-center justify-center font-mono font-extrabold text-xl text-emerald-600 dark:text-emerald-400">
                {systemMetric.lighthouseSEO}
              </div>
              <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">SEO Optimized</h4>
              <p className="text-[11px] text-slate-500">Structured Data Schema</p>
            </div>

          </div>

          {/* Hardware & Latency gauges */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-500" />
              <span>Container Hardware & Response Latency</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="text-xs font-mono text-slate-500">p99 Latency</div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{systemMetric.avgResponseMs} ms</div>
                <p className="text-[11px] text-emerald-500 font-medium">Sub-20ms edge routing</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="text-xs font-mono text-slate-500">Container CPU Load</div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{systemMetric.cpuUsagePct}%</div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${systemMetric.cpuUsagePct}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="text-xs font-mono text-slate-500">Memory Utilization</div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{systemMetric.memoryUsagePct}%</div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${systemMetric.memoryUsagePct}%` }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeSubTab === 'alerts' && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Configurable Telemetry Alert Rules</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Automated notifications trigger in real-time when telemetry conditions breach defined thresholds.
            </p>
          </div>

          <div className="space-y-3">
            {alertRules.map(rule => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    {rule.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Condition: {rule.metric} {rule.condition} {rule.threshold} • Channel: {rule.channel}
                  </p>
                </div>

                <button
                  onClick={() => toggleAlertRule(rule.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    rule.enabled
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {rule.enabled ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
