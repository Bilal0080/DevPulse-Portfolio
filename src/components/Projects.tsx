import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import {
  ExternalLink,
  Github,
  Star,
  Eye,
  Sparkles,
  Filter,
  Search,
  FileCode2,
  Check,
  X
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, t, setDeployModalOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'Systems', 'AI & ML', 'Full-Stack', 'Frontend'];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('projectsTitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* GitHub Pages Deploy Guide Link */}
        <button
          onClick={() => setDeployModalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs self-start md:self-auto"
        >
          <FileCode2 className="w-4 h-4 text-emerald-500" />
          <span>{t('githubPagesDeploy')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter by tech stack or keyword..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600"
          />
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-2xs hover:shadow-md"
          >
            {/* Image Preview */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-900/90 text-white dark:bg-slate-100/90 dark:text-slate-900 shadow-xs backdrop-blur-xs">
                  {project.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900/80 text-white text-[11px] font-mono backdrop-blur-xs">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {project.stars}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="text-xs font-semibold text-slate-900 dark:text-slate-100 hover:underline flex items-center gap-1"
                >
                  <span>Architecture Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Project Architecture Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {activeProjectModal.category} Architecture
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeProjectModal.title}
              </h3>
            </div>

            <img
              src={activeProjectModal.image}
              alt={activeProjectModal.title}
              className="w-full h-56 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
            />

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono uppercase tracking-wider">
                System Specification & Features
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeProjectModal.longDescription}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono uppercase tracking-wider">
                Tech Stack & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {activeProjectModal.stars} stars
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  {activeProjectModal.views.toLocaleString()} views
                </span>
              </div>

              <a
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold text-xs"
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
