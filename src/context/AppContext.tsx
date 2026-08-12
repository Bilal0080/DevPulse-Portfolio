import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  Language,
  ThemeMode,
  Project,
  BlogPost,
  BlogComment,
  ContactMessage,
  EngagementMetric,
  SystemMetric,
  AuditLog,
  AlertRule,
  AppNotification
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS,
  INITIAL_ENGAGEMENT_METRICS,
  INITIAL_SYSTEM_METRIC,
  INITIAL_AUDIT_LOGS,
  INITIAL_ALERT_RULES,
  INITIAL_CONTACT_MESSAGES
} from '../data/initialData';
import { translations } from '../utils/translations';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  user: User | null;
  login: (role: Role, mfaCode?: string) => boolean;
  logout: () => void;
  mfaPending: boolean;
  setMfaPending: (pending: boolean) => void;
  projects: Project[];
  blogPosts: BlogPost[];
  activePost: BlogPost | null;
  setActivePost: (post: BlogPost | null) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, name: string, email: string, content: string) => void;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'likes' | 'views' | 'commentsCount'>) => void;
  contactMessages: ContactMessage[];
  sendContactMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>) => void;
  engagementMetrics: EngagementMetric[];
  systemMetric: SystemMetric;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string, severity?: 'info' | 'warning' | 'security') => void;
  alertRules: AlertRule[];
  toggleAlertRule: (ruleId: string) => void;
  isOnline: boolean;
  notifications: AppNotification[];
  removeNotification: (id: string) => void;
  gdprAccepted: boolean;
  setGdprAccepted: (accepted: boolean) => void;
  gdprModalOpen: boolean;
  setGdprModalOpen: (open: boolean) => void;
  auditModalOpen: boolean;
  setAuditModalOpen: (open: boolean) => void;
  deployModalOpen: boolean;
  setDeployModalOpen: (open: boolean) => void;
  activeTab: 'portfolio' | 'blog' | 'analytics' | 'contact';
  setActiveTab: (tab: 'portfolio' | 'blog' | 'analytics' | 'contact') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('devpulse_theme') as ThemeMode) || 'dark';
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('devpulse_lang') as Language) || 'en';
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'portfolio' | 'blog' | 'analytics' | 'contact'>('portfolio');

  // Auth & Role
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('devpulse_user');
    return saved ? JSON.parse(saved) : { id: 'usr-visitor', name: 'Guest Visitor', email: 'visitor@devpulse.io', role: 'visitor', mfaEnabled: false };
  });
  const [mfaPending, setMfaPending] = useState<boolean>(false);

  // Data state
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(INITIAL_CONTACT_MESSAGES);
  const [engagementMetrics] = useState<EngagementMetric[]>(INITIAL_ENGAGEMENT_METRICS);
  const [systemMetric] = useState<SystemMetric>(INITIAL_SYSTEM_METRIC);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [alertRules, setAlertRules] = useState<AlertRule[]>(INITIAL_ALERT_RULES);

  // Modals & Banners
  const [gdprAccepted, setGdprAcceptedState] = useState<boolean>(() => {
    return localStorage.getItem('devpulse_gdpr') === 'true';
  });
  const [gdprModalOpen, setGdprModalOpen] = useState<boolean>(false);
  const [auditModalOpen, setAuditModalOpen] = useState<boolean>(false);
  const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Real-Time Sync Ready',
      message: 'DevPulse telemetry engine running with sub-20ms responsiveness.',
      type: 'info',
      timestamp: new Date().toLocaleTimeString(),
      read: false
    }
  ]);

  // Network Status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      pushNotification('Network Restored', 'Back online. Local offline drafts synced to telemetry engine.', 'success');
      addAuditLog('Network Event', 'Device reconnected to global telemetry grid', 'info');
    };
    const handleOffline = () => {
      setIsOnline(false);
      pushNotification('Offline Mode', 'Internet connection interrupted. Local storage active.', 'warning');
      addAuditLog('Network Event', 'Device went offline. Caching active in browser storage.', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync theme to root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('devpulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('devpulse_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const pushNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    };
    setNotifications(prev => [notif, ...prev.slice(0, 4)]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addAuditLog = (action: string, details: string, severity: 'info' | 'warning' | 'security' = 'info') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      actor: user ? `${user.name} (${user.role.toUpperCase()})` : 'System Guest',
      role: user ? user.role : 'visitor',
      action,
      details,
      ipAddress: '192.168.1.88',
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const login = (role: Role, mfaCode?: string): boolean => {
    if (role === 'admin') {
      if (!mfaCode) {
        setMfaPending(true);
        return false;
      }
      if (mfaCode !== '123456' && mfaCode !== '888888') {
        pushNotification('MFA Failed', 'Invalid 6-digit security token provided. Use 123456 or 888888.', 'error');
        addAuditLog('Failed Login Attempt', 'Invalid MFA token submitted for Admin role', 'security');
        return false;
      }
    }

    const newUser: User = {
      id: role === 'admin' ? 'usr-admin' : 'usr-visitor',
      name: role === 'admin' ? 'DevPulse Admin' : 'Guest Visitor',
      email: role === 'admin' ? 'admin@devpulse.io' : 'visitor@devpulse.io',
      role,
      mfaEnabled: role === 'admin',
      avatarUrl: role === 'admin' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' : undefined
    };

    setUser(newUser);
    setMfaPending(false);
    localStorage.setItem('devpulse_user', JSON.stringify(newUser));
    pushNotification('Authentication Success', `Authenticated as ${role.toUpperCase()}. Welcome back.`, 'success');
    addAuditLog('Role Authentication', `User authenticated into ${role.toUpperCase()} security context`, 'security');
    return true;
  };

  const logout = () => {
    const visitorUser: User = { id: 'usr-visitor', name: 'Guest Visitor', email: 'visitor@devpulse.io', role: 'visitor', mfaEnabled: false };
    setUser(visitorUser);
    localStorage.setItem('devpulse_user', JSON.stringify(visitorUser));
    pushNotification('Signed Out', 'Returned to Guest Visitor session.', 'info');
    addAuditLog('Session Terminated', 'User logged out and returned to visitor mode', 'info');
  };

  const likePost = (postId: string) => {
    setBlogPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    if (activePost && activePost.id === postId) {
      setActivePost(prev => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const addComment = (postId: string, name: string, email: string, content: string) => {
    setBlogPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );
    if (activePost && activePost.id === postId) {
      setActivePost(prev => (prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null));
    }
    pushNotification('Comment Published', 'Your comment has been attached to the article.', 'success');
    addAuditLog('Article Comment', `Comment added to post ${postId} by ${name}`, 'info');
  };

  const addBlogPost = (postData: Omit<BlogPost, 'id' | 'likes' | 'views' | 'commentsCount'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      likes: 0,
      views: 1,
      commentsCount: 0
    };
    setBlogPosts(prev => [newPost, ...prev]);
    pushNotification('Article Published', `Published new article "${newPost.title}"`, 'success');
    addAuditLog('Article Created', `Published post "${newPost.title}"`, 'info');
  };

  const sendContactMessage = (msgData: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      status: 'unread'
    };
    setContactMessages(prev => [newMsg, ...prev]);
    pushNotification('Message Sent', 'Transmission successful. Confirmation email queued.', 'success');
    addAuditLog('Inquiry Received', `Inquiry submitted by ${msgData.name} (${msgData.email})`, 'info');
  };

  const toggleAlertRule = (ruleId: string) => {
    setAlertRules(prev =>
      prev.map(r => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
    pushNotification('Rule Updated', 'Telemetry alert configuration updated.', 'info');
  };

  const setGdprAccepted = (accepted: boolean) => {
    setGdprAcceptedState(accepted);
    localStorage.setItem('devpulse_gdpr', accepted ? 'true' : 'false');
    addAuditLog('GDPR Preferences', `Consent policy setting updated to ${accepted}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        user,
        login,
        logout,
        mfaPending,
        setMfaPending,
        projects,
        blogPosts,
        activePost,
        setActivePost,
        likePost,
        addComment,
        addBlogPost,
        contactMessages,
        sendContactMessage,
        engagementMetrics,
        systemMetric,
        auditLogs,
        addAuditLog,
        alertRules,
        toggleAlertRule,
        isOnline,
        notifications,
        removeNotification,
        gdprAccepted,
        setGdprAccepted,
        gdprModalOpen,
        setGdprModalOpen,
        auditModalOpen,
        setAuditModalOpen,
        deployModalOpen,
        setDeployModalOpen,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
