import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Terminal,
  Activity,
  Cpu,
  Sparkles,
  Download,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  FileCode,
  Zap
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, setActiveTab } = useApp();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadResume = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Create mock resume file download
      const content = `DEV PULSE - SENIOR SYSTEMS ENGINEER & AI ARCHITECT
Email: contact@devpulse.io | Portfolio: https://devpulse.io
----------------------------------------------------------------
SUMMARY:
Over 8 years of experience building resilient distributed systems, high-performance telemetry engines, and AI agent frameworks.

CORE SKILLS:
- Languages: TypeScript, Rust, Python, Go, SQL
- Cloud & Systems: AWS, GCP, Cloud Run, Kubernetes, Docker, GitHub Actions
- Frameworks: React 19, Vite, Express, TailwindCSS, Recharts
- AI & ML: Gemini API (@google/genai), Vector Embeddings, Function Calling

KEY ACCOMPLISHMENTS:
- Engineered AetherFlow event mesh handling 100,000+ events/sec with sub-millisecond p99 latency.
- Built zero-overhead client telemetry suite achieving 100/100 Lighthouse ratings across all metrics.
- Developed multi-agent orchestration tools using Gemini 2.5 Flash.
`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DevPulse_Systems_Engineer_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950 dark:to-slate-900/50 transition-colors">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{t('availableForHire')}</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {t('heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Quick Capabilities Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
          <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xs">
            <Cpu className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">Distributed Mesh</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">Gemini 2.5 Agents</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xs">
            <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">p99 &lt; 18ms Telemetry</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xs">
            <Zap className="w-4 h-4 text-violet-500 shrink-0" />
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">100/100 Lighthouse</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setActiveTab('portfolio')}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>{t('viewProjects')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>{t('analyticsDashboard')}</span>
          </button>

          <button
            onClick={handleDownloadResume}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating PDF...' : 'Download Resume'}</span>
          </button>
        </div>

        {/* Telemetry Quick Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">100k+</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Events Streamed / Sec</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">99.99%</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Global System Uptime</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">&lt;18ms</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Edge p99 Latency</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">100/100</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Lighthouse Core Vitals</p>
          </div>
        </div>

      </div>
    </section>
  );
};
