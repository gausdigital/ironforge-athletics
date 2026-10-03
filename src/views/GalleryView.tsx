import React, { useState } from 'react';
import { Maximize2, Filter, Camera } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/gymData';

interface GalleryViewProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenLightbox }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Photographs' },
    { id: 'athletes', label: 'Male & Female Athletes' },
    { id: 'strength', label: 'Heavy Steel & Barbells' },
    { id: 'facility', label: 'Gym Interior & Rigs' },
    { id: 'recovery', label: 'Recovery & Mobility' },
  ];

  const filteredItems = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Visual Archive</span>
            <span aria-hidden="true">·</span>
            <span>Documentary Photography</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            THE SANCTUARY OF IRON. <br />
            <span className="text-[#d4af37]">CAPTURED IN DETAIL.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Real athletes, real chalk, competition-certified steel, and the uncompromising pursuit of physical power.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center gap-1.5 p-1.5 bg-[#10121a] border border-[#232733] overflow-x-auto">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-[#151821]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative h-80 bg-black border border-[#232733] overflow-hidden cursor-pointer shadow-lg hover:border-[#d4af37]/80 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Badge */}
              <div className="absolute top-4 right-4 p-2 bg-black/60 border border-white/10 rounded text-neutral-300 group-hover:text-[#d4af37] group-hover:border-[#d4af37]/50 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block mb-0.5">
                  {item.athleteFocus || item.category}
                </span>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 opacity-80 group-hover:opacity-100">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
