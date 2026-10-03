import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Users, Check, Filter } from 'lucide-react';
import { WEEKLY_SCHEDULE, ScheduleClass } from '../data/gymData';

interface ScheduleViewProps {
  onOpenBooking: (classId?: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onOpenBooking }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['All', 'Strength', 'Conditioning', 'Olympic Lifting', 'Functional', 'Recovery'];

  const filteredSchedule = WEEKLY_SCHEDULE.filter((item) => {
    const dayMatches = item.day === selectedDay;
    const catMatches = selectedCategory === 'All' || item.category === selectedCategory;
    return dayMatches && catMatches;
  });

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Weekly Performance Timetable</span>
            <span aria-hidden="true">·</span>
            <span>Small-Group Coaching</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            CALIBRATED TRAINING. <br />
            <span className="text-[#d4af37]">WEEKLY SCHEDULE.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            All classes are limited to 8–16 athletes to guarantee hands-on coaching, direct bar-velocity feedback, and proper warm-up protocols.
          </p>
        </div>

        {/* Day of Week Tabs */}
        <div className="mt-10 flex items-center gap-1.5 p-1.5 bg-[#10121a] border border-[#232733] overflow-x-auto">
          {days.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-[#151821]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
          <span className="text-neutral-500 font-semibold uppercase text-[11px] mr-1">Discipline:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs border transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#d4af37] text-[#d4af37] bg-[#141824]'
                  : 'border-[#232733] text-neutral-400 hover:text-white hover:border-neutral-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Schedule Table / List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] divide-y divide-[#1e232d]">
          {filteredSchedule.length === 0 ? (
            <div className="p-12 text-center text-neutral-400 text-sm">
              No classes match the chosen category for {selectedDay}. Please select another category or open floor hours.
            </div>
          ) : (
            filteredSchedule.map((item) => {
              const spotsAvailable = item.spotsTotal - item.spotsBooked;
              const isFull = spotsAvailable <= 0;

              return (
                <div
                  key={item.id}
                  className="p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-[#141824]/60 transition-colors"
                >
                  {/* Time & Duration */}
                  <div className="lg:w-48 shrink-0">
                    <div className="font-display font-bold text-2xl text-white tracking-tight tabular-nums">
                      {item.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{item.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-300">{item.zone}</span>
                    </div>
                  </div>

                  {/* Class Title & Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-[#0b0c10] border border-[#d4af37]/30 text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">
                        {item.category}
                      </span>
                      <span className="text-xs text-neutral-400">
                        Level: <strong className="text-white">{item.level}</strong>
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <User className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Coached by <strong className="text-neutral-200">{item.trainer}</strong></span>
                    </div>
                  </div>

                  {/* Spots & CTA */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1e232d]">
                    <div className="text-left lg:text-right">
                      <span className="text-xs text-neutral-400 block">Class Capacity</span>
                      <span className={`text-xs font-mono font-bold ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isFull ? 'Class Full (Waitlist)' : `${spotsAvailable} of ${item.spotsTotal} spots open`}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(item.id)}
                      disabled={isFull}
                      className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        isFull
                          ? 'bg-[#1e232d] text-neutral-500 cursor-not-allowed'
                          : 'bg-[#d4af37] hover:bg-[#e5a93c] text-black shadow-md shadow-[#d4af37]/15'
                      }`}
                    >
                      {isFull ? 'Waitlist' : 'Book Spot'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Timetable Demo Notice */}
        <div className="mt-6 text-xs text-neutral-500 bg-[#07080a] p-4 border border-[#1e232d] flex items-center justify-between">
          <span>Demonstration Timetable: Reservations use simulated bookings. Members use the Ironforge Mobile App for live attendance check-in.</span>
          <span className="font-mono text-[#d4af37]">Live Sync v4.2</span>
        </div>
      </section>
    </div>
  );
};
