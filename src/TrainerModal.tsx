import React from 'react';
import { X, Award, Dumbbell, Calendar, Quote, Check, ArrowRight, Instagram } from 'lucide-react';
import { Trainer } from '../data/gymData';

interface TrainerModalProps {
  trainer: Trainer | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTrainer: (trainerId: string) => void;
}

export const TrainerModal: React.FC<TrainerModalProps> = ({
  trainer,
  isOpen,
  onClose,
  onBookTrainer,
}) => {
  if (!isOpen || !trainer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0f1118] border border-[#232733] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="relative bg-[#151821] border-b border-[#232733] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 bg-black/70 hover:bg-black text-neutral-300 hover:text-white rounded border border-white/10 transition-colors cursor-pointer"
            aria-label="Close trainer modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Portrait */}
          <div className="w-32 h-40 sm:w-40 sm:h-48 shrink-0 overflow-hidden border-2 border-[#d4af37]/40 shadow-xl bg-black">
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details */}
          <div className="text-center sm:text-left flex-1">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              {trainer.experience}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-1">
              {trainer.name}
            </h2>
            <p className="text-sm text-neutral-300 font-medium mt-1">
              {trainer.title}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-neutral-400">
              <span className="text-[#d4af37]">Specialty:</span>
              <span>{trainer.specialty}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-neutral-400">
                <Instagram className="w-3.5 h-3.5" />
                {trainer.instagram}
              </span>
            </div>

            {/* Favorite Lift */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#0b0c10] border border-[#232733] text-xs">
              <Dumbbell className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-neutral-400">Signature Lift:</span>
              <span className="text-white font-semibold">{trainer.favoriteLift}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Coaching Philosophy Quote */}
          <div className="p-4 bg-[#141824] border-l-2 border-[#d4af37] italic text-sm text-neutral-200 flex items-start gap-3">
            <Quote className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <p className="leading-relaxed">"{trainer.quote}"</p>
          </div>

          {/* Biography */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-2">
              Background & Athletic Pedigree
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {trainer.fullBio}
            </p>
          </div>

          {/* Certifications & Credentials */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-3">
              Certifications & Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {trainer.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-[#141824] border border-[#232733] text-xs text-neutral-300">
                  <Award className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-2">
              On-Floor Coaching Schedule
            </h3>
            <div className="flex flex-wrap gap-2">
              {trainer.availableDays.map((day, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#141824] border border-[#232733] text-xs font-mono text-neutral-300"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#232733] bg-[#141824] flex items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            <span>Sessions include kinematic bar-path feedback and InBody scan.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTrainer(trainer.id);
              }}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20"
            >
              <span>Book 1-on-1 Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
