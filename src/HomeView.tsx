import React from 'react';
import { ArrowRight, Check, Dumbbell, Shield, Trophy, Flame, Play, Clock, Sparkles } from 'lucide-react';
import { BRAND_INFO, FACILITY_FEATURES, PROGRAMS, TRAINERS, MEMBERSHIP_PLANS, TESTIMONIALS } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (classId?: string, trainerId?: string) => void;
  onOpenProgram: (programId: string) => void;
  onOpenTrainer: (trainerId: string) => void;
  onOpenJoin: (tier?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenProgram,
  onOpenTrainer,
  onOpenJoin,
}) => {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#1e232d] bg-[#0b0c10]">
        {/* Cinematic Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_gym_training_1790859396596.jpg"
            alt="Ironforge Athletics strength training sanctuary with athlete"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-125 scale-105 animate-in fade-in duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to guarantee 4.5:1 text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-[#0b0c10]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-3xl">
            {/* Unboxed clean metadata kicker (anti-pill) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#d4af37] mb-4">
              <span>International Strength Club</span>
              <span aria-hidden="true">·</span>
              <span>Calibrated Competition Grade</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2016</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95] text-balance">
              BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#d4af37]">
                STRONGER SELF.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal">
              An uncompromising athletic sanctuary for bodybuilders, powerlifters, and dedicated athletes. 
              Milled steel dumbbells to 200 lbs, 14 competition power cages, Olympic platforms, and master biomechanical coaching.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenJoin('STANDARD')}
                className="px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25"
              >
                <span>JOIN NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onNavigate('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#151821]/90 hover:bg-[#202534] border border-[#232733] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>EXPLORE PROGRAMS</span>
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>Book Free Day Trial</span>
              </button>
            </div>

            {/* Micro Trust Markers */}
            <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span>Eleiko IPF Competition Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#d4af37]" />
                <span>100% Calibrated Solid Steel</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#d4af37]" />
                <span>Contrast Cryo & Cedar Sauna</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#232733]">
            {BRAND_INFO.stats.map((stat, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}>
                <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight tabular-nums">
                  <span className="text-[#d4af37]">{stat.value}</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Ironforge Heritage
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
              A Private Sanctuary Built by Lifters, for Lifters.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              IRONFORGE ATHLETICS was founded on a simple realization: commercial health clubs had surrendered discipline in favor of plastic machines, crowd control, and anti-chalk policies.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We engineered a 28,000-square-foot international cathedral of iron where heavy squats are revered, scientific biomechanics replace guesswork, and high-performance recovery accelerates systemic adaptation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#10121a] border border-[#232733]">
                <span className="font-display font-bold text-lg text-white block">No Crowds</span>
                <span className="text-xs text-neutral-400">Strict member caps ensure immediate access to cages and platforms.</span>
              </div>
              <div className="p-4 bg-[#10121a] border border-[#232733]">
                <span className="font-display font-bold text-lg text-white block">Master Staff</span>
                <span className="text-xs text-neutral-400">Certified CSCS, IWF coaches, and published kinesiology researchers.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-[#e5a93c] transition-colors cursor-pointer"
              >
                <span>Read Full Gym Story & Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-[#232733] bg-[#141824] shadow-2xl">
              <img
                src="/src/assets/images/facility_interior_strength_1790859454842.jpg"
                alt="Ironforge Athletics main strength floor"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0b0c10]/90 border border-[#232733] backdrop-blur-sm">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block">
                  International Standard
                </span>
                <span className="font-display font-bold text-base text-white">
                  28,000 Sq Ft Precision Strength & Recovery Sanctuary
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACILITY FEATURES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Architecture of Strength
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
              Engineered Facility Features
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Every square foot of our club is acoustically treated, reinforced for multi-ton drops, and calibrated to international federation standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITY_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group bg-[#10121a] border border-[#232733] hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 border border-white/10 text-[11px] font-mono text-[#d4af37]">
                  {feature.stats}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    {feature.tagline}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1e232d]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                    Key Calibrated Implements:
                  </span>
                  <div className="space-y-1">
                    {feature.equipment.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROGRAMS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Periodized Curriculums
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
              Signature Training Programs
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('programs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors cursor-pointer"
          >
            <span>View All Programs & Splits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMS.slice(0, 3).map((program) => (
            <div
              key={program.id}
              className="bg-[#10121a] border border-[#232733] hover:border-[#d4af37] transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden bg-black">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono text-[#d4af37]">{program.duration}</span>
                  <span className="px-2 py-0.5 bg-black/60 border border-white/10 uppercase tracking-wider text-[10px]">
                    {program.intensity}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs text-neutral-400 font-medium">Coach {program.trainerName}</span>
                  <h3 className="font-display font-bold text-xl text-white mt-1">
                    {program.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {program.shortDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1e232d] flex items-center justify-between">
                  <button
                    onClick={() => onOpenProgram(program.id)}
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    View Syllabus
                  </button>
                  <button
                    onClick={() => onOpenBooking(undefined, program.trainerId)}
                    className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRAINERS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Faculty
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
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
            <span>Meet All Coaches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#10121a] border border-[#232733] hover:border-[#d4af37] transition-all flex flex-col overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top brightness-90 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent" />
                <div className="absolute bottom-2 left-4 text-[11px] font-mono text-[#d4af37]">
                  {trainer.experience}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {trainer.name}
                  </h3>
                  <span className="text-xs text-[#d4af37] block font-medium">
                    {trainer.title}
                  </span>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {trainer.shortBio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e232d] flex items-center justify-between">
                  <button
                    onClick={() => onOpenTrainer(trainer.id)}
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onOpenBooking(undefined, trainer.id)}
                    className="text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:underline cursor-pointer"
                  >
                    Book 1-on-1
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. MEMBERSHIP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Join the Brotherhood of Iron
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
            Membership Tiers
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Transparent pricing. Capped membership size to guarantee zero waiting for racks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 bg-[#10121a] border flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? 'border-[#d4af37] shadow-xl shadow-[#d4af37]/10 ring-1 ring-[#d4af37]'
                  : 'border-[#232733] hover:border-neutral-500'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#d4af37] text-black">
                  Recommended
                </span>
              )}

              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                  {plan.tier} PLAN
                </span>
                <h3 className="font-display font-bold text-2xl text-white uppercase mt-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {plan.tagline}
                </p>

                <div className="my-6 pb-6 border-b border-[#1e232d] flex items-baseline gap-1">
                  <span className="font-display font-bold text-4xl text-white">${plan.monthlyPrice}</span>
                  <span className="text-xs text-neutral-400">/ month</span>
                </div>

                <div className="space-y-3">
                  {plan.features.slice(0, 5).map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      {f.included ? (
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      ) : (
                        <span className="w-4 h-4 text-neutral-600 shrink-0 text-center font-mono">✕</span>
                      )}
                      <span className={f.included ? 'text-neutral-200' : 'text-neutral-500 line-through'}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1e232d]">
                <button
                  onClick={() => onOpenJoin(plan.tier)}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-[#d4af37] hover:bg-[#e5a93c] text-black shadow-lg shadow-[#d4af37]/20'
                      : 'bg-[#151821] hover:bg-[#202534] text-white border border-[#232733]'
                  }`}
                >
                  Select {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS & ATHLETE PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] p-8 lg:p-12">
          <div className="max-w-xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Member Case Studies & Proof
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
              Transformations Under the Bar
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Sample athletic portfolio testimonials illustrating member progress and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="p-6 bg-[#0b0c10] border border-[#1e232d] flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{test.quote}"
                </p>

                <div className="pt-4 border-t border-[#1e232d] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-[#d4af37] overflow-hidden shrink-0 bg-black">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white uppercase">{test.name}</h4>
                    <span className="text-[11px] text-[#d4af37] block font-mono">{test.achievement}</span>
                    <span className="text-[10px] text-neutral-500">{test.discipline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL MOTIVATIONAL CTA */}
      <section className="relative overflow-hidden border-y border-[#232733] bg-gradient-to-b from-[#141824] to-[#0b0c10] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Take Your Place on the Platform
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
            Stop Negotiating With Weakness. <br />
            <span className="text-[#d4af37]">Claim Your Calibrated Barbell.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Join the international strength standard. Claim your personal rack orientation and tour our 28,000-sq-ft sanctuary today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenJoin('STANDARD')}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-all cursor-pointer shadow-xl shadow-[#d4af37]/25"
            >
              Start Your Membership Now
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#10121a] hover:bg-[#1a1f2c] border border-[#232733] transition-all cursor-pointer"
            >
              Book Complimentary Day Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
