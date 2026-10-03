import React from 'react';
import { X, Calendar, Check, ArrowRight, ShieldCheck, Dumbbell, Award } from 'lucide-react';
import { Program } from '../data/gymData';

interface ProgramModalProps {
  program: Program | null;
  isOpen: boolean;
  onClose: () => void;
  onBookProgram: (programId: string) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  isOpen,
  onClose,
  onBookProgram,
}) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0f1118] border border-[#232733] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-neutral-200">
        {/* Header with image banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#151821] shrink-0 border-b border-[#232733]">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover brightness-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-[#0f1118]/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 bg-black/70 hover:bg-black text-neutral-300 hover:text-white rounded border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1">
              <span>{program.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{program.intensity}</span>
              <span aria-hidden="true">·</span>
              <span>Coach {program.trainerName}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {program.title}
            </h2>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#d4af37] mb-2">
              Program Overview
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {program.fullDesc}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-3">
              Key Adaptations & Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {program.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-[#141824] border border-[#232733]">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Program Syllabus Structure */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-3">
              Periodized Microcycle Structure
            </h3>
            <div className="space-y-2.5">
              {program.structure.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#141824] border border-[#232733] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#d4af37] px-2 py-0.5 bg-[#0b0c10] border border-[#d4af37]/30">
                      {item.phase}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {item.focus}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 sm:text-right max-w-sm">
                    {item.details}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Training Split */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-3">
              Sample Weekly Split
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {program.weeklySplit.map((split, idx) => (
                <div key={idx} className="p-2.5 bg-[#0b0c10] border border-[#1e232d] text-xs text-neutral-300 flex items-center gap-2">
                  <Dumbbell className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{split}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Lifter */}
          <div className="p-4 bg-[#141824] border-l-2 border-[#d4af37] text-xs text-neutral-300">
            <span className="font-bold text-white block mb-1">Target Lifter Profile:</span>
            <span>{program.targetAudience}</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#232733] bg-[#141824] flex items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            <span>Includes full coach check-ins & custom log tracking.</span>
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
                onBookProgram(program.id);
              }}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20"
            >
              <span>Enroll / Reserve Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
