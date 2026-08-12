import React from 'react';
import { useApp } from '../context/AppContext';
import { Github, Linkedin, Twitter, Mail, Shield, FileText, Rss, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setGdprModalOpen, setAuditModalOpen, setDeployModalOpen } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">DevPulse</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                System Healthy
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Senior Systems Engineer & AI Architect specializing in resilient cloud platforms, low-latency telemetry engines, and minimalist developer experiences.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:bilaltanoli986@gmail.com"
                className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Architecture & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Compliance & Security
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setGdprModalOpen(true)}
                  className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-500" />
                  <span>GDPR / CCPA Privacy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setAuditModalOpen(true)}
                  className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>System Audit Logs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setDeployModalOpen(true)}
                  className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub Pages Workflow</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Stack Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              System Specification
            </h4>
            <div className="text-xs font-mono space-y-1.5 text-slate-500 dark:text-slate-400">
              <p>Runtime: React 19 + TypeScript</p>
              <p>Build Tool: Vite + Tailwind CSS</p>
              <p>Telemetry: Recharts + Client PWA</p>
              <p>Hosting Target: GitHub Pages / Cloud Run</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} DevPulse Architecture. All rights reserved. Built with precision minimalism.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Rss className="w-3.5 h-3.5 text-amber-500" />
              <span>RSS Technical Feed</span>
            </span>
            <span>p99 Latency: 18ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
