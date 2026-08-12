import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogEditor } from './BlogEditor';
import { BlogPost } from '../types';
import {
  BookOpen,
  Clock,
  ThumbsUp,
  MessageSquare,
  Search,
  Plus,
  ArrowLeft,
  Share2,
  Tag,
  Check,
  Send,
  User,
  Sparkles
} from 'lucide-react';

export const Blog: React.FC = () => {
  const {
    blogPosts,
    activePost,
    setActivePost,
    likePost,
    addComment,
    t,
    user
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // New Comment Form state
  const [commentName, setCommentName] = useState<string>('');
  const [commentEmail, setCommentEmail] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');

  const categories = ['All', 'Architecture', 'AI Engineering', 'Design Systems'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentName || !commentContent) return;

    addComment(activePost.id, commentName, commentEmail, commentContent);
    setCommentName('');
    setCommentEmail('');
    setCommentContent('');
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* If Active Post Reader View is selected */}
      {activePost ? (
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Back Button */}
          <button
            onClick={() => setActivePost(null)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {activePost.category}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTimeMinutes} min read
              </span>
              <span className="text-xs font-mono text-slate-400">
                • {activePost.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {activePost.title}
            </h1>

            {/* Author Profile */}
            <div className="flex items-center justify-between pt-2 border-y border-slate-200 dark:border-slate-800 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {activePost.author.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activePost.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => likePost(activePost.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4 text-amber-500" />
                  <span>{activePost.likes}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Share Article"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm whitespace-pre-line font-sans space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
            {activePost.content}
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2">
            {activePost.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>

          {/* Comments Section */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span>Discussion ({activePost.commentsCount})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={commentName}
                  onChange={e => setCommentName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={commentEmail}
                  onChange={e => setCommentEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder="Join the discussion..."
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </form>

          </div>

        </div>
      ) : (
        /* Blog Index View */
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('blogTitle')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                {t('blogSubtitle')}
              </p>
            </div>

            {/* Admin Article Creation Trigger */}
            {user && user.role === 'admin' && (
              <button
                onClick={() => setEditorOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Article</span>
              </button>
            )}
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Blog Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className="group cursor-pointer flex flex-col justify-between p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-2xs hover:shadow-md space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="px-2.5 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTimeMinutes} min
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{post.publishedAt}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      {post.commentsCount}
                    </span>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </>
      )}

      {/* Editor Modal */}
      {editorOpen && <BlogEditor onClose={() => setEditorOpen(false)} />}

    </section>
  );
};
