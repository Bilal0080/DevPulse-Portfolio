import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileCode2, Copy, Check, ExternalLink, Download, Sparkles } from 'lucide-react';

export const DeployModal: React.FC = () => {
  const { setDeployModalOpen } = useApp();
  const [copiedYaml, setCopiedYaml] = useState(false);

  const workflowYaml = `# GitHub Actions Workflow for GitHub Pages Deployment
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Application
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(workflowYaml);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  const handleDownloadYaml = () => {
    const blob = new Blob([workflowYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deploy.yml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        <button
          onClick={() => setDeployModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              GitHub Pages Deployment Guide
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Export and host this sleek portfolio site directly on GitHub Pages with automated CI/CD.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center text-[10px]">1</span>
              <span>Create Repository & Enable Pages</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 pl-7">
              Push your project code to a public or private GitHub repository. In repository <strong>Settings → Pages</strong>, set Source to <strong>"GitHub Actions"</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center text-[10px]">2</span>
              <span>Add GitHub Actions Workflow File</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 pl-7">
              Place the workflow file at <code className="font-mono text-emerald-600 dark:text-emerald-400 bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> in your root folder.
            </p>
          </div>
        </div>

        {/* Workflow Code Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Workflow File (.github/workflows/deploy.yml)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyYaml}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200"
              >
                {copiedYaml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedYaml ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadYaml}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .yml</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-52 border border-slate-800">
            {workflowYaml}
          </pre>
        </div>

      </div>
    </div>
  );
};
