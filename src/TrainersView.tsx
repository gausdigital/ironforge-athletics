import React, { useState } from 'react';
import { Award, Dumbbell, Calendar, ArrowRight, Instagram, CheckCircle2 } from 'lucide-react';
import { TRAINERS, Trainer } from '../data/gymData';

interface TrainersViewProps {
  onOpenTrainer: (trainerId: string) => void;
  onOpenBooking: (classId?: string, trainerId?: string) => void;
}

export const TrainersView: React.FC<TrainersViewProps> = ({
  onOpenTrainer,
  onOpenBooking,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialtyFilters = [
    { id: 'all', label: 'All Coaches' },
    { id: 'powerlifting', label: 'Powerlifting & Heavy Steel' },
    { id: 'biomechanics', label: 'Biomechanics & Spine' },
    { id: 'physique', label: 'Physique & Symmetry' },
    { id: 'functional', label: 'Functional & Engine' },
  ];

  const filteredTrainers = selectedSpecialty === 'all'
    ? TRAINERS
    : TRAINERS.filter((t) => {
        if (selectedSpecialty === 'powerlifting') return t.specialty.toLowerCase().includes('powerlifting') || t.name.includes('Marcus');
        if (selectedSpecialty === 'biomechanics') return t.specialty.toLowerCase().includes('biomechanics') || t.name.includes('Elena');
        if (selectedSpecialty === 'physique') return t.specialty.toLowerCase().includes('bodybuilding') || t.specialty.toLowerCase().includes('symmetry') || t.name.includes('David');
        if (selectedSpecialty === 'functional') return t.specialty.toLowerCase().includes('engine') || t.specialty.toLowerCase().includes('hyrox') || t.name.includes('Samantha');
        return true;
      });

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Coaching Faculty</span>
            <span aria-hidden="true">·</span>
            <span>Master Practitioners</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            ELITE HUMAN COACHING. <br />
            <span className="text-[#d4af37]">UNRIVALED TRACK RECORD.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every coach on our floor holds master-level certifications, extensive competitive backgrounds, and an obsessive dedication to athlete progress.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center gap-1.5 p-1.5 bg-[#10121a] border border-[#232733] overflow-x-auto">
          {specialtyFilters.map((tab) => {
            const isActive = selectedSpecialty === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSpecialty(tab.id)}
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

      {/* Trainer Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#10121a] border border-[#232733] hover:border-[#d4af37]/70 transition-all duration-300 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-xl"
            >
              {/* Photo */}
              <div className="w-full sm:w-44 h-64 sm:h-auto overflow-hidden bg-black shrink-0 border border-[#232733] relative">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top brightness-90 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/85 border border-white/10 text-[10px] font-mono text-[#d4af37] text-center">
                  {trainer.experience}
                </div>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
                      {trainer.gender === 'male' ? 'Master Coach' : 'Director of Performance'}
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-[#d4af37]" />
                      {trainer.instagram}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white tracking-tight mt-1">
                    {trainer.name}
                  </h3>
                  <span className="text-xs text-[#d4af37] font-semibold block mt-0.5">
                    {trainer.title}
                  </span>

                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                    {trainer.shortBio}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#1e232d] text-xs">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Dumbbell className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Signature Lift: <strong className="text-white">{trainer.favoriteLift}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Award className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate">Credentials: <strong className="text-white">{trainer.certifications.slice(0, 2).join(' · ')}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#1e232d] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenTrainer(trainer.id)}
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={() => onOpenBooking(undefined, trainer.id)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer shadow-md shadow-[#d4af37]/15"
                  >
                    Book 1-on-1
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coaching Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-[#10121a] border border-[#232733]">
          <div className="max-w-2xl mb-6">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Ironforge Coaching Guarantee
            </span>
            <h3 className="font-display font-bold text-2xl text-white uppercase mt-1">
              What Sets Our Coaches Apart
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div className="space-y-1.5 p-4 bg-[#0b0c10] border border-[#1e232d]">
              <strong className="text-white uppercase font-bold block text-sm">Kinematic Analysis</strong>
              <p className="text-neutral-400">High-speed bar path tracking to eliminate eccentric drift and optimize mechanical efficiency.</p>
            </div>
            <div className="space-y-1.5 p-4 bg-[#0b0c10] border border-[#1e232d]">
              <strong className="text-white uppercase font-bold block text-sm">Individual Anatomical Sockets</strong>
              <p className="text-neutral-400">We never force universal cues. We fit squats and deadlifts to your specific skeletal levers.</p>
            </div>
            <div className="space-y-1.5 p-4 bg-[#0b0c10] border border-[#1e232d]">
              <strong className="text-white uppercase font-bold block text-sm">Autoregulated Programming</strong>
              <p className="text-neutral-400">Weekly adjustments based on HRV, sleep metrics, and velocity-based power output.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
