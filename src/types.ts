export type Role = 'visitor' | 'admin';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja';

export type ThemeMode = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  mfaEnabled: boolean;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  stars: number;
  views: number;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  category: 'Full-Stack' | 'AI & ML' | 'Systems' | 'Frontend' | 'Cloud';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTimeMinutes: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  likes: number;
  views: number;
  commentsCount: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budgetRange: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export interface EngagementMetric {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  blogReads: number;
  contactSubmissions: number;
  avgDurationSec: number;
  bounceRatePct: number;
}

export interface RegionalTraffic {
  country: string;
  code: string;
  visitors: number;
  percentage: number;
}

export interface SystemMetric {
  lighthousePerformance: number;
  lighthouseAccessibility: number;
  lighthouseBestPractices: number;
  lighthouseSEO: number;
  avgResponseMs: number;
  uptimePct: number;
  cpuUsagePct: number;
  memoryUsagePct: number;
  activeSockets: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: Role;
  action: string;
  details: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'security';
}

export interface AlertRule {
  id: string;
  name: string;
  metric: 'traffic' | 'errorRate' | 'latency' | 'contactLead';
  condition: 'above' | 'below';
  threshold: number;
  enabled: boolean;
  channel: 'email' | 'system' | 'webhook';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}
