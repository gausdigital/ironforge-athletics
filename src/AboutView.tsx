import React from 'react';
import { ArrowRight, ShieldCheck, Dumbbell, Award, Target, Flame, HeartHandshake, CheckCircle } from 'lucide-react';
import { BRAND_INFO, TRAINERS } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
  onOpenTrainer: (trainerId: string) => void;
  onOpenJoin: (tier?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenTrainer,
  onOpenJoin,
}) => {
  return (
    <div className="py-12 md:py-20 space-y-24">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Our Heritage & Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Founded 2016</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            FORGED IN RESISTANCE. <br />
            <span className="text-[#d4af37]">COMMITTED TO EXCELLENCE.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            IRONFORGE ATHLETICS was established to restore the sacred bond between lifter and barbell. We rejected commercial fitness compromises to build an international temple of physical transformation.
          </p>
        </div>
      </section>

      {/* Gym Story & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Genesis
            </span>
            <h2 className="font-display font-bold text-3xl text-white uppercase tracking-tight">
              Why Ironforge Came Into Existence
            </h2>
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                In 2016, founder Marcus Vance and a collective of national-level powerlifters, Olympic lifters, and collegiate strength coaches gathered in an industrial warehouse. Commercial gyms were outlawing deadlifts, removing free-weight benches, and replacing barbells with screen-based cardio pods.
              </p>
              <p>
                We answered by forging an unapologetic environment. We sourced 14 heavy-gauge steel cages, imported certified competition bars from Sweden, and poured acoustic drop pads capable of absorbing 1,000-pound drops without vibration.
              </p>
              <p>
                Today, IRONFORGE ATHLETICS stands as an international beacon for lifters worldwide. Whether you are a corporate executive stepping up to your first 225-pound squat or a competitive athlete peaking for a national championship, our standard never lowers.
              </p>
            </div>

            <div className="pt-4 border-t border-[#232733] flex items-center gap-6 text-xs text-neutral-400">
              <div>
                <span className="font-display font-bold text-2xl text-white block">28,000</span>
                <span>Square Feet Facility</span>
              </div>
              <div className="w-[1px] h-10 bg-[#232733]" />
              <div>
                <span className="font-display font-bold text-2xl text-[#d4af37] block">100%</span>
                <span>Calibrated Competition Steel</span>
              </div>
              <div className="w-[1px] h-10 bg-[#232733]" />
              <div>
                <span className="font-display font-bold text-2xl text-white block">0%</span>
                <span>Fluff or Gimmicks</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="overflow-hidden border border-[#232733] bg-[#141824] shadow-2xl">
              <img
                src="/src/assets/images/hero_gym_training_1790859396596.jpg"
                alt="Ironforge training sanctuary"
                className="w-full h-[450px] object-cover brightness-85"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Tenets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Our Non-Negotiable Standard
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
            The Four Tenets of Ironforge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#10121a] border border-[#232733] space-y-3">
            <div className="w-10 h-10 border border-[#d4af37] flex items-center justify-center bg-[#0b0c10]">
              <Dumbbell className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase">
              1. Calibrated Steel
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We do not tolerate warped bars or inaccurate weight stamps. Every plate is verified within +/- 10 grams, ensuring your training numbers correspond to objective reality.
            </p>
          </div>

          <div className="p-6 bg-[#10121a] border border-[#232733] space-y-3">
            <div className="w-10 h-10 border border-[#d4af37] flex items-center justify-center bg-[#0b0c10]">
              <Target className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase">
              2. Biomechanical Truth
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ego lifting destroys joints. Our coaches use video bar velocity analysis, joint angle assessment, and clinical InBody tracking to keep athletes progressing without injury.
            </p>
          </div>

          <div className="p-6 bg-[#10121a] border border-[#232733] space-y-3">
            <div className="w-10 h-10 border border-[#d4af37] flex items-center justify-center bg-[#0b0c10]">
              <HeartHandshake className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase">
              3. Mutual Brotherhood
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ironforge is an inclusive high-standard tribe. Male and female lifters respect chalk, re-rack their weights, spot each other on heavy singles, and celebrate genuine breakthroughs.
            </p>
          </div>

          <div className="p-6 bg-[#10121a] border border-[#232733] space-y-3">
            <div className="w-10 h-10 border border-[#d4af37] flex items-center justify-center bg-[#0b0c10]">
              <Flame className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase">
              4. Contrast Recovery
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Stimulus without repair produces breakdown. Our 38°F chilled cold plunge baths, 205°F dry saunas, and compression lounges ensure your nervous system resets rapidly.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment & Facility Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Equipment Pedigree
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Built to International Championship Standards
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                When you step into Ironforge, you are touching the exact equipment chosen by the International Powerlifting Federation (IPF) and the International Weightlifting Federation (IWF).
              </p>

              <div className="space-y-2 pt-2">
                {[
                  '14 Custom Rogue & Atlantis Power Cages with Westside Hole Spacing',
                  'Eleiko IPF Certified Competition Powerlifting Bars and Steel Discs',
                  'Solid Milled Steel Dumbbells from 5 lbs to 200 lbs in Pairs',
                  '6 Solid Oak Olympic Weightlifting Platforms with Werksan Bumpers',
                  'Dual 38°F Chilled Filtered Cryo Plunge Baths & 205°F Cedar Sauna',
                  'Clinical InBody 770 Multi-Frequency Body Composition Rig',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <img
                src="/src/assets/images/facility_interior_strength_1790859454842.jpg"
                alt="Equipment details"
                className="w-full h-80 object-cover border border-[#232733]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Faculty Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Leadership
            </span>
            <h2 className="font-display font-bold text-3xl text-white uppercase tracking-tight mt-1">
              Master Strength Coaches
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('trainers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors cursor-pointer"
          >
            <span>View Complete Trainer Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#10121a] border border-[#232733] hover:border-[#d4af37] transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-56 overflow-hidden bg-black mb-4">
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top brightness-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-display font-bold text-base text-white">{trainer.name}</h3>
                <span className="text-xs text-[#d4af37] block mt-0.5">{trainer.title}</span>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{trainer.shortBio}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e232d]">
                <button
                  onClick={() => onOpenTrainer(trainer.id)}
                  className="w-full py-2 text-xs font-bold uppercase tracking-wider text-white hover:text-black hover:bg-[#d4af37] border border-[#232733] transition-colors cursor-pointer"
                >
                  View Profile & PRs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#141824] to-[#10121a] border border-[#232733] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
              Ready to Experience Ironforge in Person?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Book a private facility walkthrough with a master coach and test our competition platforms.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenJoin('STANDARD')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
            >
              Join the Club
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
