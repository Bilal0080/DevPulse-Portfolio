import jsPDF from 'jspdf';
import { EngagementMetric, SystemMetric, AuditLog, ContactMessage } from '../types';

export function exportAnalyticsPDF(
  metrics: EngagementMetric[],
  system: SystemMetric,
  auditLogs: AuditLog[],
  contacts: ContactMessage[]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('DevPulse Executive Analytics & Telemetry Report', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Generated: ${new Date().toLocaleString()} | Classification: Confidential System Audit`, 14, 20);

  y = 36;

  // Key Performance Indicators (KPI Summary Boxes)
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Executive KPI Summary', 14, y);
  y += 6;

  const totalViews = metrics.reduce((acc, m) => acc + m.pageViews, 0);
  const totalVisitors = metrics.reduce((acc, m) => acc + m.uniqueVisitors, 0);
  const totalBlogReads = metrics.reduce((acc, m) => acc + m.blogReads, 0);
  const totalInquiries = contacts.length;

  // 4 metric summary cards
  const cardWidth = 42;
  const cardHeight = 18;
  const cards = [
    { label: 'Page Views (7d)', val: totalViews.toLocaleString() },
    { label: 'Unique Visitors', val: totalVisitors.toLocaleString() },
    { label: 'Blog Reads', val: totalBlogReads.toLocaleString() },
    { label: 'Inquiries Lead', val: totalInquiries.toString() },
  ];

  cards.forEach((card, idx) => {
    const x = 14 + idx * (cardWidth + 4);
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(card.val, x + 4, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(card.label, x + 4, y + 14);
  });

  y += cardHeight + 10;

  // System Health & Lighthouse Audit
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Core Web Vitals & System Health', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const scores = [
    `Performance Score: ${system.lighthousePerformance}/100`,
    `Accessibility Score: ${system.lighthouseAccessibility}/100`,
    `Best Practices: ${system.lighthouseBestPractices}/100`,
    `SEO Rating: ${system.lighthouseSEO}/100`,
    `Average Server Latency: ${system.avgResponseMs} ms`,
    `System Uptime: ${system.uptimePct}%`,
  ];

  scores.forEach((score) => {
    doc.text(`• ${score}`, 18, y);
    y += 5;
  });

  y += 4;

  // Engagement Daily Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Daily Engagement Breakdown', 14, y);
  y += 6;

  // Table header
  doc.setFillColor(226, 232, 240); // slate-200
  doc.rect(14, y, pageWidth - 28, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('Date', 18, y + 5);
  doc.text('Page Views', 50, y + 5);
  doc.text('Visitors', 85, y + 5);
  doc.text('Blog Reads', 120, y + 5);
  doc.text('Inquiries', 155, y + 5);
  doc.text('Bounce %', 180, y + 5);

  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  metrics.forEach((m, i) => {
    if (i % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, pageWidth - 28, 6, 'F');
    }
    doc.setTextColor(51, 65, 85);
    doc.text(m.date, 18, y + 4);
    doc.text(m.pageViews.toString(), 50, y + 4);
    doc.text(m.uniqueVisitors.toString(), 85, y + 4);
    doc.text(m.blogReads.toString(), 120, y + 4);
    doc.text(m.contactSubmissions.toString(), 155, y + 4);
    doc.text(`${m.bounceRatePct}%`, 180, y + 4);
    y += 6;
  });

  y += 8;

  // System Compliance Audit Logs
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Security & Compliance Audit Log Excerpt', 14, y);
  y += 6;

  auditLogs.slice(0, 5).forEach((log) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(`[${log.timestamp}] ${log.action} (${log.severity.toUpperCase()})`, 18, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Actor: ${log.actor} (${log.ipAddress}) - ${log.details}`, 18, y);
    y += 6;
  });

  // Footer page stamp
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('DevPulse System Report • GDPR & CCPA Compliant • Page 1 of 1', 14, 287);

  doc.save(`DevPulse_Telemetry_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportMetricsCSV(metrics: EngagementMetric[]) {
  const headers = ['Date', 'Page Views', 'Unique Visitors', 'Blog Reads', 'Contact Submissions', 'Avg Duration (s)', 'Bounce Rate (%)'];
  const rows = metrics.map(m => [
    m.date,
    m.pageViews,
    m.uniqueVisitors,
    m.blogReads,
    m.contactSubmissions,
    m.avgDurationSec,
    m.bounceRatePct
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `DevPulse_Metrics_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
