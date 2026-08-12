import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Terminal,
  Sun,
  Moon,
  Globe,
  Wifi,
  WifiOff,
  Shield,
  ShieldAlert,
  BarChart3,
  BookOpen,
  FolderGit2,
  Mail,
  User,
  LogOut,
  Menu,
  X,
  FileCode2,
  Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
    user,
    logout,
    isOnline,
    activeTab,
    setActiveTab,
    setAuditModalOpen,
    setDeployModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'ja', label: 'JA' },
  ];

  const navItems = [
    { id: 'portfolio' as const, label: t('viewProjects'), icon: FolderGit2 },
    { id: 'blog' as const, label: t('readBlog'), icon: BookOpen },
    { id: 'contact' as const, label: t('contactMe'), icon: Mail },
    { id: 'analytics' as const, label: t('analyticsDashboard'), icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('portfolio')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-mono font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base tracking-tight flex items-center gap-2">
                DevPulse
                <span className="text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  v2.5
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Systems & AI Studio</p>
            </div>
          </button>

          {/* Network status indicator */}
          <div className="hidden md:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">{t('onlineStatus')}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-500" />
                <span className="text-amber-600 dark:text-amber-400 font-medium text-[11px]">{t('offlineStatus')}</span>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools: Language, Theme, Audit Logs, GitHub Deploy, Auth */}
        <div className="hidden lg:flex items-center space-x-2">
          
          {/* GitHub Pages Deploy Quick Button */}
          <button
            onClick={() => setDeployModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="GitHub Pages Setup"
          >
            <FileCode2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Deploy</span>
          </button>

          {/* Compliance Audit Logs Trigger */}
          <button
            onClick={() => setAuditModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Audit & Compliance Logs"
          >
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <span>Audit Logs</span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center border border-slate-200 dark:border-slate-800 rounded-md bg-slate-50 dark:bg-slate-900 p-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2" />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-mono font-medium text-slate-700 dark:text-slate-300 focus:outline-none px-1.5 py-1 cursor-pointer"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Auth Button & Role Badge */}
          {user && user.role === 'admin' ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin
              </span>
              <button
                onClick={logout}
                className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t('login')}</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as Language)}
                className="bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-800 dark:text-slate-200 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-800"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuditModalOpen(true); setMobileMenuOpen(false); }}
                className="px-2.5 py-1.5 rounded text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                Audit
              </button>
              <button
                onClick={() => { setDeployModalOpen(true); setMobileMenuOpen(false); }}
                className="px-2.5 py-1.5 rounded text-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                Deploy
              </button>
              {user && user.role === 'admin' ? (
                <button
                  onClick={logout}
                  className="px-2.5 py-1.5 rounded text-xs bg-rose-500/10 text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                  className="px-3 py-1.5 rounded text-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
