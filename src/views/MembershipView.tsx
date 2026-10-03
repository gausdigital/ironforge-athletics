import React, { useState } from 'react';
import { Check, ShieldCheck, Dumbbell, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS, MembershipPlan, FAQS } from '../data/gymData';
import { PageId } from '../components/Navbar';

interface MembershipViewProps {
  onOpenJoin: (tier?: string) => void;
  onOpenBooking: () => void;
  onNavigate: (page: PageId) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({
  onOpenJoin,
  onOpenBooking,
  onNavigate,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Membership Tiers</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Access</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            INVEST IN YOUR <br />
            <span className="text-[#d4af37]">STRONGER SELF.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            All memberships include full access to our 28,000 sq ft facility, calibrated competition iron, and luxury locker amenities. We cap membership to ensure you never wait for a power cage.
          </p>

          {/* Billing Switch */}
          <div className="mt-10 inline-flex items-center gap-2 p-1.5 bg-[#10121a] border border-[#232733]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] text-emerald-400 font-mono px-1.5 py-0.5 bg-black/40 border border-emerald-500/30">
                Save 15%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`bg-[#10121a] border flex flex-col justify-between p-8 relative transition-all shadow-xl ${
                  plan.popular
                    ? 'border-[#d4af37] ring-1 ring-[#d4af37] bg-gradient-to-b from-[#141824] to-[#10121a]'
                    : 'border-[#232733] hover:border-neutral-500'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#d4af37] text-black text-xs font-black uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                    {plan.tier} TIER
                  </span>
                  <h3 className="font-display font-bold text-3xl text-white uppercase mt-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-[#1e232d] flex items-baseline gap-1">
                    <span className="font-display font-black text-5xl text-white tracking-tight">${price}</span>
                    <span className="text-xs text-neutral-400 font-medium">/ month</span>
                  </div>

                  {/* Perks Summary */}
                  <div className="mb-6">
                    <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold block mb-2">
                      Included Privileges:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.perks.map((perk, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 bg-[#0b0c10] border border-[#232733] text-[11px] text-neutral-300"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detailed features list */}
                  <div className="space-y-3 pt-4 border-t border-[#1e232d]">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-4 h-4 text-neutral-600 shrink-0 text-center font-mono">✕</span>
                        )}
                        <span className={feature.included ? 'text-neutral-200' : 'text-neutral-500 line-through'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-[#1e232d]">
                  <button
                    onClick={() => onOpenJoin(plan.tier)}
                    className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-[#d4af37] hover:bg-[#e5a93c] text-black shadow-lg shadow-[#d4af37]/25'
                        : 'bg-[#151821] hover:bg-[#202534] text-white border border-[#232733]'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                  <span className="block text-center text-[10px] text-neutral-500 mt-2">
                    Simulated portfolio demo · No hidden setup fees
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] p-8 lg:p-12 overflow-x-auto">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Side-by-Side Breakdown
            </span>
            <h3 className="font-display font-bold text-2xl text-white uppercase mt-1">
              Comprehensive Feature Comparison
            </h3>
          </div>

          <table className="w-full text-left border-collapse min-w-[600px] text-xs">
            <thead>
              <tr className="border-b border-[#232733] text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="py-4 pr-4">Privilege / Amenity</th>
                <th className="py-4 px-4 text-center">Iron Access</th>
                <th className="py-4 px-4 text-center text-[#d4af37]">Performance Club</th>
                <th className="py-4 px-4 text-center">Elite Athlete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e232d] text-neutral-300">
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">Full 7-Day Open Floor Access</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">✓</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">✓</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">Eleiko IPF Calibrated Bars & Steel Plates</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">✓</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">✓</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">InBody 770 Diagnostic Scans</td>
                <td className="py-3.5 px-4 text-center text-neutral-400">Quarterly</td>
                <td className="py-3.5 px-4 text-center text-white">Monthly</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">Bi-Weekly</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">Recovery Suite (38°F Plunge + 205°F Sauna)</td>
                <td className="py-3.5 px-4 text-center text-neutral-600">—</td>
                <td className="py-3.5 px-4 text-center text-white">4 Passes / Mo</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">Unlimited 24/7</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">Weekly Performance Group Classes</td>
                <td className="py-3.5 px-4 text-center text-neutral-600">—</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">Unlimited</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">Unlimited + Priority</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">Complimentary Guest Passes</td>
                <td className="py-3.5 px-4 text-center text-neutral-600">—</td>
                <td className="py-3.5 px-4 text-center text-white">2 / Month</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">5 / Month</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-medium text-white">Dedicated Master Coach Check-In</td>
                <td className="py-3.5 px-4 text-center text-neutral-600">—</td>
                <td className="py-3.5 px-4 text-center text-neutral-400">Orientation Only</td>
                <td className="py-3.5 px-4 text-center text-[#d4af37]">Monthly 60-min 1-on-1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Trial / Day Pass Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#141824] via-[#10121a] to-[#0b0c10] border border-[#232733] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              First Time Visiting?
            </span>
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight mt-1">
              Experience a Single-Day Competition Pass
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Visiting from out of town or want to test our platforms before committing? Reserve an all-day pass for $35 (credited toward your first month upon joining).
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer shrink-0"
          >
            Claim Day Pass
          </button>
        </div>
      </section>
    </div>
  );
};
