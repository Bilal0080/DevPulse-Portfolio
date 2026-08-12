import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Send, FileText } from 'lucide-react';

interface BlogEditorProps {
  onClose: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ onClose }) => {
  const { addBlogPost, user } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('TypeScript, System Design, Web Perf');
  const [readTime, setReadTime] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    addBlogPost({
      title,
      slug,
      excerpt: excerpt || title,
      content,
      category,
      tags,
      publishedAt: new Date().toISOString().slice(0, 10),
      readTimeMinutes: readTime,
      author: {
        name: user ? user.name : 'DevPulse Architect',
        avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Principal Systems Architect'
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Publish New Technical Article
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Article Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Scaling Multi-Agent AI Architectures on Cloud Run"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Architecture">Architecture</option>
                <option value="AI Engineering">AI Engineering</option>
                <option value="Design Systems">Design Systems</option>
                <option value="Web Perf">Web Perf</option>
                <option value="Security">Security</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Estimated Read Time (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={readTime}
                onChange={e => setReadTime(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="TypeScript, Gemini API, Cloud Run"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Excerpt Summary
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Brief summary displayed on article cards..."
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Article Content (Markdown supported)
            </label>
            <textarea
              rows={10}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="### Overview&#10;&#10;Write technical deep-dive here with code blocks..."
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold"
            >
              <Send className="w-4 h-4" />
              <span>Publish Article</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
