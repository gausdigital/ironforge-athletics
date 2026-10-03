import React, { useState } from 'react';
import { ArrowRight, Check, Dumbbell, Clock, Flame, Shield, Filter } from 'lucide-react';
import { PROGRAMS, Program } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface ProgramsViewProps {
  onOpenProgram: (programId: string) => void;
  onOpenBooking: (classId?: string, trainerId?: string) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  onOpenProgram,
  onOpenBooking,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'strength', label: 'Strength & Power' },
    { id: 'bodybuilding', label: 'Hypertrophy & Physique' },
    { id: 'functional', label: 'Functional & Hyrox' },
    { id: 'beginner', label: 'Beginner Foundations' },
    { id: 'personal', label: '1-on-1 Private Coaching' },
  ];

  const filteredPrograms = selectedFilter === 'all'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === selectedFilter);

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Periodized Curriculums</span>
            <span aria-hidden="true">·</span>
            <span>Scientific Adaptation</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            PROVEN TRAINING SYSTEMS. <br />
            <span className="text-[#d4af37]">ZERO COMPROMISE.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every program at Ironforge Athletics is engineered with autoregulated block periodization, progressive overload metrics, and joint-friendly kinematic angles.
          </p>
        </div>

        {/* Filter Segmented Control (Anti-Pill: Clean Functional Buttons) */}
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

      {/* Program Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-[#10121a] border border-[#232733] hover:border-[#d4af37]/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              {/* Image banner */}
              <div className="relative h-56 overflow-hidden bg-black">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-[#10121a]/40 to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 border border-[#d4af37]/40 text-[11px] font-mono text-[#d4af37]">
                  {program.duration}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-neutral-300">
                  {program.intensity}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs text-[#d4af37] font-semibold block">Coach {program.trainerName}</span>
                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    {program.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {program.shortDesc}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2 border-t border-[#1e232d]">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                    Core Adaptations:
                  </span>
                  {program.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#1e232d] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenProgram(program.id)}
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View Full Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenBooking(undefined, program.trainerId)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer shadow-md shadow-[#d4af37]/15"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modular Program Detail Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] p-8 lg:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Periodization Framework
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
              How Every Ironforge Block is Built
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              We do not prescribe arbitrary daily workouts. Every athlete works through three disciplined phases:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0b0c10] border border-[#1e232d] space-y-2">
              <span className="font-mono text-xs font-bold text-[#d4af37] block">Phase 01 · Weeks 1–4</span>
              <h3 className="font-display font-bold text-lg text-white uppercase">Hypertrophic Base</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                High repetition volume (68–75% 1RM) aimed at tendon remodeling, capillary density, and muscle cross-sectional area.
              </p>
            </div>
            <div className="p-6 bg-[#0b0c10] border border-[#1e232d] space-y-2">
              <span className="font-mono text-xs font-bold text-[#d4af37] block">Phase 02 · Weeks 5–8</span>
              <h3 className="font-display font-bold text-lg text-white uppercase">Force Conversion</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Loading increases to 80–87% 1RM with paused repetitions and accommodating resistance (bands & chains) to eliminate sticking points.
              </p>
            </div>
            <div className="p-6 bg-[#0b0c10] border border-[#1e232d] space-y-2">
              <span className="font-mono text-xs font-bold text-[#d4af37] block">Phase 03 · Weeks 9–12</span>
              <h3 className="font-display font-bold text-lg text-white uppercase">Realization & Peaking</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Neurological taper, max-effort singles above 90% 1RM, and PR realization on calibrated competition platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
