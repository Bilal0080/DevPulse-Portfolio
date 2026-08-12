import { Project, BlogPost, EngagementMetric, RegionalTraffic, SystemMetric, AuditLog, AlertRule, ContactMessage } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'AetherFlow: Event-Driven Microservices Mesh',
    description: 'Ultra-low-latency distributed event streaming engine with real-time web assembly workers.',
    longDescription: 'AetherFlow handles over 100k events/sec with sub-millisecond p99 response times. Built with Rust, TypeScript, and gRPC, featuring an interactive web dashboard for real-time pipeline topology monitoring and automated load shedding.',
    tags: ['Rust', 'TypeScript', 'gRPC', 'WebAssembly', 'Kafka'],
    stars: 342,
    views: 14200,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    category: 'Systems',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 'proj-2',
    title: 'CogniNexus: Multi-Agent AI Orchestrator',
    description: 'Autonomous multi-modal AI agent execution graph powered by Gemini 2.5 and local vector memory.',
    longDescription: 'CogniNexus empowers developers to chain specialized AI agents for deep research, code generation, and automated QA. Features real-time web browser sandboxing and hierarchical agent memory stores.',
    tags: ['Gemini API', 'React 19', 'Vector DB', 'TailwindCSS', 'Python'],
    stars: 589,
    views: 28400,
    featured: true,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'AI & ML',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 'proj-3',
    title: 'PulseTrace: Real-Time Web Telemetry Engine',
    description: 'Lightweight client-side performance monitor with zero runtime overhead and automated anomaly detection.',
    longDescription: 'PulseTrace records core web vitals, network payloads, and DOM re-render bottlenecks in real-time. Exports compact binary telemetry packets to Cloudflare Workers for near-instant rendering on live dashboards.',
    tags: ['TypeScript', 'Recharts', 'Edge Computing', 'Vite', 'TailwindCSS'],
    stars: 215,
    views: 9800,
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'Full-Stack',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 'proj-4',
    title: 'Minimalist Portfolio & Blog Engine',
    description: 'Production-ready GitHub Pages static site generator with offline-first PWA caching and RBAC analytics.',
    longDescription: 'Designed for high performance and WCAG AA accessibility, featuring instant theme switching, multi-language internationalization, offline data syncing, and exportable PDF/CSV reports.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'jsPDF'],
    stars: 412,
    views: 18900,
    featured: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Frontend',
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Architecting Zero-Cost High Performance Telemetry on GitHub Pages',
    slug: 'zero-cost-telemetry-github-pages',
    excerpt: 'How to build real-time analytics, client-side audit logs, and PDF export reporting without expensive cloud server infrastructure.',
    content: `
### Introduction

Modern web developers often think that tracking user engagement, core web vitals, and system telemetry requires spinning up costly cloud instances or paying hefty SaaS analytics subscriptions.

In this deep dive, we explore how to leverage client-side storage, Web Vitals APIs, local IndexedDB caching, and serverless edge functions to deliver a **100% offline-first, zero-overhead analytics dashboard**.

### Key Architectural Pillars

1. **Lightweight Beacon API**: Transmit non-blocking metric payloads using \`navigator.sendBeacon\`.
2. **Local Telemetry Aggregation**: Buffer time-series data locally so users in low-connectivity areas experience zero data loss.
3. **Responsive Visualization**: Utilize Recharts and CSS Grid layout containers to deliver crisp, accessible performance dashboards.
4. **Client-Side PDF/CSV Reporting**: Compile executive reports dynamically using \`jsPDF\` directly in the browser.

\`\`\`typescript
// Example: Capturing Core Web Vitals silently
export function captureVitals() {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      console.log(\`[Vital] \${entry.name}: \${entry.startTime.toFixed(2)}ms\`);
    });
  }
}
\`\`\`

### Conclusion

With clean separation of concerns, modern full-stack developers can build professional portfolios that function as both personal showpieces and enterprise-grade analytics hubs.
`,
    category: 'Architecture',
    tags: ['Web Perf', 'Analytics', 'TypeScript', 'GitHub Pages'],
    publishedAt: '2026-08-01',
    readTimeMinutes: 5,
    author: {
      name: 'DevPulse Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Principal Systems Architect'
    },
    likes: 128,
    views: 3410,
    commentsCount: 14
  },
  {
    id: 'post-2',
    title: 'Mastering AI Agent Orchestration with Gemini 2.5 Flash',
    slug: 'ai-agent-orchestration-gemini',
    excerpt: 'A practical framework for structured JSON outputs, function calling graphs, and low-latency streaming in React applications.',
    content: `
### The Evolution of Multi-Agent Systems

AI applications are shifting from simple prompt-response interactions toward **autonomous multi-agent execution graphs**. In these architectures, dedicated AI agents collaborate on complex software tasks—ranging from static analysis to UI test generation.

### Why Gemini 2.5 Flash?

* **Sub-second Latency**: Essential for interactive chat tools and live telemetry assistants.
* **Large Context Windows**: Effortlessly process whole codebases and detailed system documentation.
* **Native Tool Calling**: Seamlessly execute database queries, file reads, and API requests.

\`\`\`typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeSystemHealth(metrics: object) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Analyze these server metrics for anomalies: \${JSON.stringify(metrics)}\`,
  });
  return response.text;
}
\`\`\`

### Summary

Integrating intelligent server-side agent endpoints allows modern web applications to provide real-time recommendations, anomaly alerts, and automated data summarization.
`,
    category: 'AI Engineering',
    tags: ['Gemini API', 'AI Agents', 'Full-Stack', 'Node.js'],
    publishedAt: '2026-07-22',
    readTimeMinutes: 7,
    author: {
      name: 'DevPulse Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Principal Systems Architect'
    },
    likes: 245,
    views: 6120,
    commentsCount: 22
  },
  {
    id: 'post-3',
    title: 'Designing Accessible, High-Contrast Minimalist User Interfaces',
    slug: 'accessible-minimalist-ui-design',
    excerpt: 'Principles of WCAG AA compliance, dark mode token systems, and mathematical typographic spacing without visual bloat.',
    content: `
### Rejecting "AI Slop" Visual Templates

Minimalism isn't just removing elements—it's establishing **mathematical harmony, crisp typographic hierarchy, and intentional negative space**.

### The Core Guidelines

1. **High Contrast Ratios**: Ensure text against canvas meets at least 4.5:1 ratio for body text.
2. **Subtle Neutrals**: Avoid stark #000 or harsh whites; use warm or cool off-black and slate backgrounds.
3. **Fluid Typography**: Maintain strict modular scale steps (1.2x - 1.33x) to keep text readable across devices.
4. **Touch Target Sizing**: Ensure all touch targets are at least 44x44px for effortless mobile navigation.

### Implementation Tip

Use semantic CSS variables for theme switching rather than hardcoding Tailwind colors everywhere:

\`\`\`css
:root {
  --bg-primary: #f8fafc;
  --text-primary: #0f172a;
}

.dark {
  --bg-primary: #090d16;
  --text-primary: #f1f5f9;
}
\`\`\`
`,
    category: 'Design Systems',
    tags: ['CSS', 'Accessibility', 'UX Design', 'TailwindCSS'],
    publishedAt: '2026-07-10',
    readTimeMinutes: 4,
    author: {
      name: 'DevPulse Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Principal Systems Architect'
    },
    likes: 96,
    views: 2190,
    commentsCount: 8
  }
];

export const INITIAL_ENGAGEMENT_METRICS: EngagementMetric[] = [
  { date: 'Aug 04', pageViews: 1240, uniqueVisitors: 890, blogReads: 410, contactSubmissions: 3, avgDurationSec: 182, bounceRatePct: 32.4 },
  { date: 'Aug 05', pageViews: 1420, uniqueVisitors: 980, blogReads: 520, contactSubmissions: 5, avgDurationSec: 195, bounceRatePct: 30.1 },
  { date: 'Aug 06', pageViews: 1890, uniqueVisitors: 1250, blogReads: 740, contactSubmissions: 8, avgDurationSec: 210, bounceRatePct: 28.5 },
  { date: 'Aug 07', pageViews: 2100, uniqueVisitors: 1410, blogReads: 890, contactSubmissions: 6, avgDurationSec: 225, bounceRatePct: 26.8 },
  { date: 'Aug 08', pageViews: 1950, uniqueVisitors: 1320, blogReads: 810, contactSubmissions: 7, avgDurationSec: 218, bounceRatePct: 27.2 },
  { date: 'Aug 09', pageViews: 2480, uniqueVisitors: 1680, blogReads: 1020, contactSubmissions: 12, avgDurationSec: 240, bounceRatePct: 24.5 },
  { date: 'Aug 10', pageViews: 2890, uniqueVisitors: 1940, blogReads: 1210, contactSubmissions: 15, avgDurationSec: 255, bounceRatePct: 22.9 },
];

export const REGIONAL_TRAFFIC: RegionalTraffic[] = [
  { country: 'United States', code: 'US', visitors: 4210, percentage: 38.5 },
  { country: 'Germany', code: 'DE', visitors: 1890, percentage: 17.3 },
  { country: 'United Kingdom', code: 'GB', visitors: 1420, percentage: 13.0 },
  { country: 'Japan', code: 'JP', visitors: 1150, percentage: 10.5 },
  { country: 'Canada', code: 'CA', visitors: 980, percentage: 9.0 },
  { country: 'Others', code: 'GLOBAL', visitors: 1280, percentage: 11.7 },
];

export const INITIAL_SYSTEM_METRIC: SystemMetric = {
  lighthousePerformance: 99,
  lighthouseAccessibility: 100,
  lighthouseBestPractices: 100,
  lighthouseSEO: 100,
  avgResponseMs: 18,
  uptimePct: 99.99,
  cpuUsagePct: 14.2,
  memoryUsagePct: 32.8,
  activeSockets: 42
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-08-10 09:42:15',
    actor: 'Admin (System)',
    role: 'admin',
    action: 'MFA Verification',
    details: 'Multi-factor authentication challenge completed successfully from IP 192.168.1.45',
    ipAddress: '192.168.1.45',
    severity: 'info'
  },
  {
    id: 'log-102',
    timestamp: '2026-08-10 08:30:10',
    actor: 'Visitor',
    role: 'visitor',
    action: 'GDPR Cookie Consent',
    details: 'Accepted analytics and functional privacy preferences',
    ipAddress: '66.249.66.1',
    severity: 'info'
  },
  {
    id: 'log-103',
    timestamp: '2026-08-09 18:12:00',
    actor: 'Admin',
    role: 'admin',
    action: 'Blog Post Created',
    details: 'Published new post: Architecting Zero-Cost High Performance Telemetry',
    ipAddress: '192.168.1.45',
    severity: 'info'
  },
  {
    id: 'log-104',
    timestamp: '2026-08-09 14:05:22',
    actor: 'System Telemetry',
    role: 'admin',
    action: 'Alert Triggered',
    details: 'Traffic volume spike threshold surpassed (>2,000 daily pageviews)',
    ipAddress: '127.0.0.1',
    severity: 'warning'
  }
];

export const INITIAL_ALERT_RULES: AlertRule[] = [
  { id: 'rule-1', name: 'High Traffic Spike (>2,500 daily)', metric: 'traffic', condition: 'above', threshold: 2500, enabled: true, channel: 'system' },
  { id: 'rule-2', name: 'Latency Spike (>100ms)', metric: 'latency', condition: 'above', threshold: 100, enabled: true, channel: 'system' },
  { id: 'rule-3', name: 'New Client Inquiry Received', metric: 'contactLead', condition: 'above', threshold: 0, enabled: true, channel: 'email' }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Lin',
    email: 'sarah.lin@techventure.io',
    subject: 'Senior AI Systems Consulting',
    projectType: 'AI Architecture & Optimization',
    budgetRange: '$10,000 - $25,000',
    message: 'We are building an autonomous research pipeline and would love your assistance optimizing the latency and vector retrieval architecture.',
    timestamp: '2026-08-09 16:45',
    status: 'unread'
  },
  {
    id: 'msg-2',
    name: 'Marcus Vance',
    email: 'marcus@cloudscale.net',
    subject: 'Speaking Invitation - Cloud Systems Summit',
    projectType: 'Keynote & Technical Workshop',
    budgetRange: '$5,000 - $10,000',
    message: 'Would you be open to giving a keynote on zero-cost edge telemetry architectures at our upcoming cloud summit?',
    timestamp: '2026-08-08 11:20',
    status: 'read'
  }
];
