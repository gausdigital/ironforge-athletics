import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Sparkles, Dumbbell } from 'lucide-react';
import { MEMBERSHIP_PLANS, MembershipPlan } from '../data/gymData';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  initialTier = 'STANDARD',
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(initialTier);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [addOnRecovery, setAddOnRecovery] = useState<boolean>(false);
  const [addOnNutrition, setAddOnNutrition] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.tier === selectedTier) || MEMBERSHIP_PLANS[1];
  const basePrice = billingCycle === 'annual' ? currentPlan.annualPrice : currentPlan.monthlyPrice;
  const addOnsTotal = (addOnRecovery ? 35 : 0) + (addOnNutrition ? 45 : 0);
  const finalPrice = basePrice + addOnsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1118] border border-[#232733] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232733] bg-[#141824]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-[#d4af37] flex items-center justify-center bg-[#0b0c10]">
              <Dumbbell className="w-3.5 h-3.5 text-[#d4af37]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
              {isSuccess ? 'Membership Enrolled' : 'Join Ironforge Athletics'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close join modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Portfolio Demo Enrollment
                </span>
                <h4 className="font-display font-bold text-2xl text-white mt-1">
                  Welcome to the Club, {name}
                </h4>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2">
                  Your profile has been created with the <strong className="text-white">{currentPlan.name}</strong> tier. Your digital scan card is ready for demo check-in.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-4 bg-[#141824] border border-[#232733] text-left max-w-md mx-auto space-y-2 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-[#232733]">
                  <span className="text-neutral-400">Membership Tier:</span>
                  <span className="font-bold text-white">{currentPlan.name} ({currentPlan.tier})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Billing Cycle:</span>
                  <span className="text-white capitalize">{billingCycle} (Demo)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Calculated Rate:</span>
                  <span className="font-mono text-[#d4af37] font-bold">${finalPrice} / month</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#232733]">
                  <span className="text-neutral-400">Membership ID:</span>
                  <span className="font-mono text-neutral-300">IF-MEMBER-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
                >
                  Close & Explore Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#141824] border border-[#232733]">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                  Select Billing Term:
                </span>
                <div className="flex items-center gap-1 bg-[#0b0c10] p-1 border border-[#232733]">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 text-xs font-bold uppercase transition-colors cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-[#d4af37] text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-3 py-1 text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                      billingCycle === 'annual'
                        ? 'bg-[#d4af37] text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Annual</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Save 15%</span>
                  </button>
                </div>
              </div>

              {/* Tier Cards Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Choose Membership Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MEMBERSHIP_PLANS.map((plan) => {
                    const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                    const isSelected = selectedTier === plan.tier;
                    return (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => setSelectedTier(plan.tier)}
                        className={`p-4 text-left border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#141824] border-[#d4af37] ring-1 ring-[#d4af37]'
                            : 'bg-[#0b0c10] border-[#232733] hover:border-neutral-500'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#d4af37] text-black">
                            Popular
                          </span>
                        )}
                        <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                          {plan.name}
                        </h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-[#d4af37]">${price}</span>
                          <span className="text-xs text-neutral-400">/ mo</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                          {plan.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Optional Performance Add-Ons
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-[#141824] border border-[#232733] cursor-pointer hover:border-neutral-500 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addOnRecovery}
                        onChange={(e) => setAddOnRecovery(e.target.checked)}
                        className="rounded border-[#232733] text-[#d4af37] focus:ring-0 focus:ring-offset-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Unlimited Contrast Recovery Suite</span>
                        <span className="text-[11px] text-neutral-400">Daily access to 38°F chilled plunges and 205°F cedar sauna</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#d4af37] font-semibold">+$35/mo</span>
                  </label>

                  <label className="flex items-center justify-between p-3 bg-[#141824] border border-[#232733] cursor-pointer hover:border-neutral-500 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addOnNutrition}
                        onChange={(e) => setAddOnNutrition(e.target.checked)}
                        className="rounded border-[#232733] text-[#d4af37] focus:ring-0 focus:ring-offset-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Sports Nutrition & Macro Blueprint</span>
                        <span className="text-[11px] text-neutral-400">Monthly consultation and targeted nutrient timing charts</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#d4af37] font-semibold">+$45/mo</span>
                  </label>
                </div>
              </div>

              {/* Athlete Details */}
              <div className="space-y-4 pt-2 border-t border-[#232733]">
                <h4 className="text-xs uppercase tracking-wider text-white font-bold">
                  Applicant Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Stone"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="athlete@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Total & Disclaimer */}
              <div className="p-4 bg-[#07080a] border border-[#1e232d] flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block">Estimated Demo Total</span>
                  <span className="text-[11px] text-neutral-500">No real billing or card information collected</span>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-2xl text-[#d4af37]">${finalPrice}</span>
                  <span className="text-xs text-neutral-400"> / month</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer shadow-lg shadow-[#d4af37]/20"
                >
                  Submit Demo Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
