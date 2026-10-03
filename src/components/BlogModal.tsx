import React from 'react';
import { X, Calendar, Clock, User, Bookmark, CheckCircle, Share2 } from 'lucide-react';
import { BlogPost } from '../data/gymData';

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0f1118] border border-[#232733] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-neutral-200">
        {/* Banner */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-[#151821] shrink-0 border-b border-[#232733]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover brightness-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-[#0f1118]/60 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 bg-black/70 hover:bg-black text-neutral-300 hover:text-white rounded border border-white/10 transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1">
              <span>{post.category}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Author Byline */}
          <div className="flex items-center justify-between pb-4 border-b border-[#232733] text-xs text-neutral-400">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1e2330] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold">
                {post.author.name[0]}
              </div>
              <div>
                <span className="text-white font-semibold block">{post.author.name}</span>
                <span>{post.author.role}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#141824] border border-[#232733] text-neutral-300">
              Ironforge Research Archive
            </span>
          </div>

          {/* Abstract / Summary */}
          <p className="text-base text-neutral-200 font-medium leading-relaxed italic border-l-2 border-[#d4af37] pl-4">
            {post.summary}
          </p>

          {/* Sections */}
          <div className="space-y-6">
            {post.content.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-display font-bold text-lg text-white tracking-tight">
                  {sec.heading}
                </h3>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm text-neutral-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.takeaways && sec.takeaways.length > 0 && (
                  <div className="mt-4 p-4 bg-[#141824] border border-[#232733] space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block">
                      Core Actionable Takeaways:
                    </span>
                    <ul className="space-y-1.5">
                      {sec.takeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#232733] bg-[#141824] flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Published for educational and portfolio demonstration.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
          >
            Finished Reading
          </button>
        </div>
      </div>
    </div>
  );
};
