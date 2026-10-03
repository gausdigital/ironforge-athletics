import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../data/gymData';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2 text-neutral-400 hover:text-white bg-black/50 hover:bg-black border border-white/10 rounded transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-neutral-400 hover:text-white bg-black/60 hover:bg-[#d4af37] hover:text-black border border-white/10 rounded transition-colors cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-neutral-400 hover:text-white bg-black/60 hover:bg-[#d4af37] hover:text-black border border-white/10 rounded transition-colors cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main image container */}
      <div className="max-w-5xl max-h-[85vh] p-4 flex flex-col items-center">
        <div className="relative max-h-[70vh] overflow-hidden rounded border border-[#232733] shadow-2xl bg-black">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[70vh] w-auto object-contain mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            {item.athleteFocus || item.category}
          </span>
          <h3 className="font-display font-bold text-lg text-white mt-1">
            {item.title}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
