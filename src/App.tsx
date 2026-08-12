import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AuditLogModal } from './components/AuditLogModal';
import { PrivacyModal } from './components/PrivacyModal';
import { DeployModal } from './components/DeployModal';
import { NotificationCenter } from './components/NotificationCenter';

const MainContent: React.FC = () => {
  const {
    activeTab,
    auditModalOpen,
    gdprModalOpen,
    deployModalOpen
  } = useApp();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-slate-900 selection:text-white dark:selection:bg-slate-100 dark:selection:text-slate-900">
      
      {/* Header */}
      <Header onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'portfolio' && (
          <>
            <Hero />
            <Projects />
            <div className="bg-slate-50/50 dark:bg-slate-900/30 py-8 border-t border-slate-200 dark:border-slate-800">
              <Contact />
            </div>
          </>
        )}

        {activeTab === 'blog' && <Blog />}

        {activeTab === 'analytics' && <AnalyticsDashboard />}

        {activeTab === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      {auditModalOpen && <AuditLogModal />}
      {gdprModalOpen && <PrivacyModal />}
      {deployModalOpen && <DeployModal />}

      {/* Toast Notifications */}
      <NotificationCenter />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
