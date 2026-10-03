import React, { useState } from 'react';
import { Search, Clock, ArrowRight, User, BookOpen } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/gymData';

interface BlogViewProps {
  onOpenArticle: (post: BlogPost) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenArticle }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Strength Training', 'Biomechanics', 'Recovery', 'Nutrition'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Ironforge Journal</span>
            <span aria-hidden="true">·</span>
            <span>Strength Science & Biomechanics</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            EVIDENCE-BASED <br />
            <span className="text-[#d4af37]">STRENGTH JOURNAL.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Written by our master strength coaches and biomechanics researchers. In-depth examinations of periodization, hypertrophy mechanisms, and recovery biology.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 bg-[#10121a] border border-[#232733]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#d4af37] text-black'
                    : 'text-neutral-400 hover:text-white hover:bg-[#151821]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative md:w-72">
            <input
              type="text"
              placeholder="Search articles, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#141824] border border-[#232733] text-white text-xs pl-9 pr-3.5 py-2 focus:outline-none focus:border-[#d4af37]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#10121a] border border-[#232733] hover:border-[#d4af37]/70 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Banner image */}
              <div
                onClick={() => onOpenArticle(post)}
                className="relative h-60 overflow-hidden bg-black cursor-pointer group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/85 border border-[#d4af37]/40 text-[10px] font-mono text-[#d4af37] uppercase tracking-wider">
                  {post.category}
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono text-neutral-400">{post.date}</span>
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2
                    onClick={() => onOpenArticle(post)}
                    className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e232d] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{post.author.name}</span>
                  </div>

                  <button
                    onClick={() => onOpenArticle(post)}
                    className="text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
