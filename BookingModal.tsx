import React, { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, Dumbbell, ShieldCheck, Database, Loader2, Copy, Check } from 'lucide-react';
import { WEEKLY_SCHEDULE, TRAINERS } from '../data/gymData';
import { saveBookingToSupabase, SUPABASE_PROJECT_ID, SUPABASE_BOOKINGS_SQL } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClassId?: string;
  preselectedTrainerId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedClassId,
  preselectedTrainerId,
}) => {
  const [bookingType, setBookingType] = useState<'class' | 'private' | 'daypass'>(
    preselectedClassId ? 'class' : preselectedTrainerId ? 'private' : 'class'
  );
  const [selectedClassId, setSelectedClassId] = useState<string>(preselectedClassId || WEEKLY_SCHEDULE[0].id);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(preselectedTrainerId || TRAINERS[0].id);
  const [date, setDate] = useState<string>('2026-10-05');
  const [timeSlot, setTimeSlot] = useState<string>('07:30 AM');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('Intermediate (1-3 yrs)');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [supabaseStatus, setSupabaseStatus] = useState<{
    synced: boolean;
    error?: string;
    isTableMissing?: boolean;
  }>({ synced: false });
  const [showSqlCode, setShowSqlCode] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedClass = WEEKLY_SCHEDULE.find((c) => c.id === selectedClassId);
  const selectedTrainer = TRAINERS.find((t) => t.id === selectedTrainerId);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    const randomCode = 'IF-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);

    const bookingPayload = {
      confirmation_code: randomCode,
      full_name: fullName,
      email: email,
      phone: phone,
      session_type: bookingType,
      class_title: bookingType === 'class' ? selectedClass?.title : bookingType === 'private' ? 'Private Coaching Session' : 'Day Pass',
      trainer_name: bookingType === 'class' ? selectedClass?.trainer : bookingType === 'private' ? selectedTrainer?.name : 'Gym Staff',
      scheduled_date: date,
      time_window: bookingType === 'class' ? selectedClass?.time || timeSlot : timeSlot,
      experience_level: experienceLevel,
      notes: notes,
    };

    // Save to Supabase
    const result = await saveBookingToSupabase(bookingPayload);
    setSupabaseStatus({
      synced: result.success,
      error: result.error,
      isTableMissing: result.isTableMissing,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_BOOKINGS_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setSupabaseStatus({ synced: false });
    setShowSqlCode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1118] border border-[#232733] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232733] bg-[#141824]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-[#d4af37] flex items-center justify-center bg-[#0b0c10]">
              <Dumbbell className="w-3.5 h-3.5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                {isSubmitted ? 'Booking Confirmed' : 'Reserve Session / Class'}
              </h3>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Reservation Dispatched
                </span>
                <h4 className="font-display font-bold text-2xl text-white mt-1">
                  Spot Reserved Successfully
                </h4>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2">
                  Thank you, <strong className="text-white">{fullName}</strong>. Your session details have been recorded.
                </p>
              </div>

              {/* Supabase Storage Status Indicator */}
              <div className="p-3.5 bg-[#141824] border border-[#232733] max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-semibold text-white">Supabase Cloud Database</span>
                  </div>
                  {supabaseStatus.synced ? (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider rounded">
                      Stored in Table public.bookings
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] uppercase font-bold tracking-wider rounded">
                      Local Backup & Supabase Linked
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between">
                  <span>Project ID:</span>
                  <span className="text-[#d4af37]">{SUPABASE_PROJECT_ID}</span>
                </div>
                {supabaseStatus.error && (
                  <div className="text-[11px] text-amber-400/90 pt-1 border-t border-[#232733]">
                    <span>Notice: {supabaseStatus.error}</span>
                  </div>
                )}
                {/* SQL schema quick-access if table needs creation */}
                {(!supabaseStatus.synced || supabaseStatus.isTableMissing) && (
                  <div className="pt-2 border-t border-[#232733]">
                    <button
                      type="button"
                      onClick={() => setShowSqlCode(!showSqlCode)}
                      className="text-[11px] text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>{showSqlCode ? 'Hide Supabase SQL Schema' : 'Need to create the table? Click to view SQL'}</span>
                    </button>
                    {showSqlCode && (
                      <div className="mt-2 p-2 bg-[#0b0c10] border border-[#232733] text-[10px] text-neutral-300 font-mono overflow-x-auto relative">
                        <button
                          onClick={copySql}
                          className="absolute top-2 right-2 px-2 py-1 bg-[#141824] hover:bg-[#232733] text-white border border-[#232733] text-[10px] flex items-center gap-1"
                        >
                          {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-neutral-400" />}
                          <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                        </button>
                        <pre className="pr-16">{SUPABASE_BOOKINGS_SQL.trim()}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 bg-[#141824] border border-[#232733] text-left max-w-md mx-auto space-y-2 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-[#232733]">
                  <span className="text-neutral-400">Confirmation Code:</span>
                  <span className="font-mono font-bold text-[#d4af37]">{confirmationCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Session Type:</span>
                  <span className="text-white font-medium capitalize">
                    {bookingType === 'class' ? selectedClass?.title : bookingType === 'private' ? `1-on-1 with ${selectedTrainer?.name}` : 'Full Day Competition Pass'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Scheduled Date:</span>
                  <span className="text-white">{date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Time Window:</span>
                  <span className="text-white">{bookingType === 'class' ? selectedClass?.time : timeSlot}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#232733]">
                  <span className="text-neutral-400">Booking Status:</span>
                  <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">Confirmed & Saved</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Type selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Select Booking Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingType('class')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                      bookingType === 'class'
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-[#141824] text-neutral-300 border-[#232733] hover:border-neutral-500'
                    }`}
                  >
                    Group Class
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('private')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                      bookingType === 'private'
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-[#141824] text-neutral-300 border-[#232733] hover:border-neutral-500'
                    }`}
                  >
                    1-on-1 Coach
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('daypass')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                      bookingType === 'daypass'
                        ? 'bg-[#d4af37] text-black border-[#d4af37]'
                        : 'bg-[#141824] text-neutral-300 border-[#232733] hover:border-neutral-500'
                    }`}
                  >
                    Day Pass Trial
                  </button>
                </div>
              </div>

              {/* Conditional Selection depending on type */}
              {bookingType === 'class' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    Select Class & Time Slot
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-[#d4af37]"
                  >
                    {WEEKLY_SCHEDULE.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.day} · {item.time} — {item.title} ({item.trainer})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {bookingType === 'private' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Master Coach
                    </label>
                    <select
                      value={selectedTrainerId}
                      onChange={(e) => setSelectedTrainerId(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-[#d4af37]"
                    >
                      {TRAINERS.map((trainer) => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.name} — {trainer.specialty.slice(0, 30)}...
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 rounded-none focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="07:00 AM">07:00 AM (Early Lifter)</option>
                      <option value="09:00 AM">09:00 AM (Mid-Morning)</option>
                      <option value="12:30 PM">12:30 PM (Midday Power)</option>
                      <option value="04:30 PM">04:30 PM (Pre-Peak)</option>
                      <option value="06:30 PM">06:30 PM (Evening Prime)</option>
                    </select>
                  </div>
                </div>
              )}

              {bookingType === 'daypass' && (
                <div className="p-3 bg-[#141824] border border-[#232733] text-xs text-neutral-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    Day passes include full open-floor access to all power cages, calibrated plates, dumbbells up to 200 lbs, and locker room amenities for one full operating day.
                  </span>
                </div>
              )}

              {/* Date Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Session Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                  />
                  <Calendar className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4 pt-2 border-t border-[#232733]">
                <h4 className="text-xs uppercase tracking-wider text-white font-bold">
                  Athlete Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="athlete@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Lifting Experience</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Beginner (< 1 year)">Beginner (&lt; 1 year)</option>
                      <option value="Intermediate (1-3 yrs)">Intermediate (1–3 years)</option>
                      <option value="Advanced Lifter (3-5+ yrs)">Advanced Lifter (3–5+ years)</option>
                      <option value="Competitive Athlete">Competitive Athlete / Powerlifter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Goals or Injuries (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Focus on squat mechanics, hip mobility, preparing for upcoming meet..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Supabase Storage Notice */}
              <div className="text-[11px] text-neutral-400 bg-[#07080a] p-3 border border-[#1e232d] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Connected to Supabase Project: <strong className="text-white font-mono">{SUPABASE_PROJECT_ID}</strong></span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Live Sync</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white bg-transparent transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer shadow-lg shadow-[#d4af37]/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSubmitting ? 'Saving to Supabase...' : 'Confirm & Save Booking'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

