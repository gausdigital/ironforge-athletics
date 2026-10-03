import React from 'react';
import { BRAND_INFO } from '../data/gymData';
import { PageId } from './Navbar';
import { ArrowUp, MapPin, Phone, Mail, Clock, Database } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: (tier?: string) => void;
  onOpenAdminBookings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenJoinModal, onOpenAdminBookings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080a] border-t border-[#1e232d] text-neutral-400">
      {/* Top Banner / Mission strip */}
      <div className="border-b border-[#171b24] py-10 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The International Standard
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-1">
              BUILD YOUR STRONGER SELF.
            </h3>
            <p className="text-sm text-neutral-400 mt-2">
              Equipped with calibrated competition barbells, biomechanical master coaches, and a culture of relentless personal growth.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenJoinModal('PREMIUM')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-all cursor-pointer whitespace-nowrap"
            >
              Start Your Membership
            </button>
            <button
              onClick={() => {
                onNavigate('schedule');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#151821] hover:bg-[#1e2330] border border-[#232733] transition-all cursor-pointer whitespace-nowrap"
            >
              View Class Timetable
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 border border-[#d4af37] flex items-center justify-center bg-[#151821]">
                <span className="font-display font-bold text-xs text-[#d4af37]">IF</span>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight uppercase">
                {BRAND_INFO.name}
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed pr-6 mb-6">
              A private strength club and high-performance sanctuary engineered for dedicated athletes, bodybuilders, and professionals refusing mediocrity.
            </p>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{BRAND_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{BRAND_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Club Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('programs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Training Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('trainers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Master Coaches
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('membership'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Membership Tiers
                </button>
              </li>
            </ul>
          </div>

          {/* Member Experiences */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Experience
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('schedule'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Class Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Facility Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Strength Journal / Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Location & Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenJoinModal('BASIC')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Request Day Pass
                </button>
              </li>
              {onOpenAdminBookings && (
                <li>
                  <button
                    onClick={onOpenAdminBookings}
                    className="text-[#d4af37] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5 font-medium"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase Appointments DB</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Hours & Facility */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Club Hours
            </h4>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-[#d4af37] pl-3 py-0.5">
                <span className="text-white font-medium block">Monday – Friday</span>
                <span className="text-neutral-400">{BRAND_INFO.hours.weekdays}</span>
              </div>
              <div className="border-l-2 border-[#333c4d] pl-3 py-0.5">
                <span className="text-white font-medium block">Saturday – Sunday</span>
                <span className="text-neutral-400">{BRAND_INFO.hours.weekends}</span>
              </div>
              <div className="border-l-2 border-[#333c4d] pl-3 py-0.5">
                <span className="text-white font-medium block">Recovery Suite</span>
                <span className="text-neutral-400">{BRAND_INFO.hours.recoverySuite}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer & Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#171b24] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span>© {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved. </span>
            <span className="text-neutral-400">Portfolio & Demo Concept Website.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Ethics & Philosophy
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Concierge Desk
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-[#151821] hover:bg-[#232733] text-neutral-300 rounded transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
