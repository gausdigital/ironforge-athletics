import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Database } from 'lucide-react';
import { BRAND_INFO } from '../data/gymData';

export type PageId = 'home' | 'about' | 'programs' | 'trainers' | 'membership' | 'schedule' | 'gallery' | 'blog' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: (tier?: string) => void;
  onOpenAdminBookings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenJoinModal, onOpenAdminBookings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'membership', label: 'Membership' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0b0c10]/95 backdrop-blur-md border-[#232733] py-3.5 shadow-2xl shadow-black/60'
            : 'bg-[#0b0c10]/70 backdrop-blur-sm border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark (Single text element in display face) */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
              aria-label="Ironforge Athletics Home"
            >
              <div className="w-8 h-8 rounded-none border border-[#d4af37] flex items-center justify-center bg-[#151821] group-hover:bg-[#d4af37] transition-colors duration-300">
                <span className="font-display font-extrabold text-sm text-[#d4af37] group-hover:text-black transition-colors">
                  IF
                </span>
              </div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white uppercase group-hover:text-[#d4af37] transition-colors">
                {BRAND_INFO.name}
              </span>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-sm font-medium transition-colors relative py-1 focus:outline-none cursor-pointer ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              {onOpenAdminBookings && (
                <button
                  type="button"
                  onClick={onOpenAdminBookings}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#151821] hover:bg-[#1f2535] border border-[#232733] transition-colors cursor-pointer"
                  title="View appointments saved in Supabase"
                >
                  <Database className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden xl:inline">Supabase Data</span>
                </button>
              )}

              <button
                onClick={() => onOpenJoinModal('STANDARD')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#d4af37]/20 whitespace-nowrap"
              >
                <span>Join Club</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-300 hover:text-white bg-[#151821] border border-[#232733] rounded focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex flex-col h-full bg-[#0b0c10] border-l border-[#232733] w-4/5 max-w-sm ml-auto p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#232733]">
              <span className="font-display font-bold text-base tracking-wider text-[#d4af37]">
                IRONFORGE
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3 py-2.5 text-left text-base font-medium rounded transition-colors ${
                    currentPage === link.id
                      ? 'text-white bg-[#151821] border-l-2 border-[#d4af37] font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-[#151821]/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {currentPage === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-[#232733] flex flex-col gap-3">
              {onOpenAdminBookings && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminBookings();
                  }}
                  className="w-full py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-200 bg-[#151821] border border-[#232733] hover:border-[#d4af37]"
                >
                  <Database className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>View Supabase Appointments</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal('STANDARD');
                }}
                className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors"
              >
                Join Ironforge Club
              </button>
              <div className="text-center text-xs text-neutral-500 pt-2">
                <span>{BRAND_INFO.hours.weekdays}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
