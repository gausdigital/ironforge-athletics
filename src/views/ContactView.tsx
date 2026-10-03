import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, ShieldAlert, Navigation } from 'lucide-react';
import { BRAND_INFO, FAQS } from '../data/gymData';

export const ContactView: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('Membership Inquiry');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <span>Concierge & Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Flagship Sanctuary</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
            CONNECT WITH <br />
            <span className="text-[#d4af37]">IRONFORGE ATHLETICS.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Have questions regarding membership availability, private master coaching, or scheduling a facility walkthrough? Our concierge team is at your disposal.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#10121a] border border-[#232733] p-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">
                Club Information
              </h3>

              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider">Facility Address</strong>
                    <span>{BRAND_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider">Direct Concierge Phone</strong>
                    <span>{BRAND_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider">Electronic Inquiries</strong>
                    <span>{BRAND_INFO.email}</span>
                  </div>
                </div>
              </div>

              {/* Operating Hours Box */}
              <div className="pt-6 border-t border-[#1e232d] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>Operating Hours</span>
                </div>
                <div className="space-y-2 text-xs text-neutral-400">
                  <div className="flex justify-between pb-1 border-b border-[#1e232d]">
                    <span>Monday – Friday:</span>
                    <span className="text-white font-mono">{BRAND_INFO.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-[#1e232d]">
                    <span>Saturday – Sunday:</span>
                    <span className="text-white font-mono">{BRAND_INFO.hours.weekends}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recovery Suite:</span>
                    <span className="text-[#d4af37] font-mono">{BRAND_INFO.hours.recoverySuite}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Security Note */}
            <div className="p-6 bg-[#10121a] border border-[#232733] text-xs text-neutral-400 space-y-2">
              <span className="text-xs font-bold uppercase text-white block">
                Private Parking & Security
              </span>
              <p>
                80 dedicated underground secure parking stalls with high-speed Level 2 EV charging stations available exclusively for active members and scheduled guests.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#10121a] border border-[#232733] p-8 sm:p-10 shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white uppercase">
                    Message Dispatched
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. Your inquiry has been received by our concierge desk. We will respond within 4 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Electronic Dispatch
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight mt-1">
                      Send a Message to Our Concierge
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Thomas Drake"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        Email Address *
                      </label>
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
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Membership Inquiry">Membership Inquiry (General)</option>
                        <option value="Private Coaching">1-on-1 Master Coaching</option>
                        <option value="Day Pass / Walkthrough">Schedule Private Facility Tour</option>
                        <option value="Media & Partnerships">Commercial & Athlete Sponsorship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your current training, background, and what you are looking to achieve at Ironforge..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#141824] border border-[#232733] text-white text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="text-[11px] text-neutral-500 bg-[#07080a] p-3 border border-[#1e232d]">
                    <span>Demo Mode: Your message is simulated for portfolio demonstration.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
                  >
                    <span>Send Message to Concierge</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simulated Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10121a] border border-[#232733] overflow-hidden">
          <div className="p-6 border-b border-[#232733] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Sanctuary Coordinates
              </span>
              <h3 className="font-display font-bold text-xl text-white uppercase mt-0.5">
                Flagship Location Map
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Navigation className="w-4 h-4 text-[#d4af37]" />
              <span>450 Ironworks Blvd · Performance District</span>
            </div>
          </div>

          {/* Interactive Styled Map Blueprint */}
          <div className="relative h-72 sm:h-80 bg-[#07080a] flex items-center justify-center overflow-hidden">
            {/* Grid Lines Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Stylized Map Roads */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[2px] bg-[#232733] rotate-12" />
              <div className="w-full h-[2px] bg-[#232733] -rotate-45" />
              <div className="h-full w-[2px] bg-[#232733]" />
            </div>

            {/* Location Pin Card */}
            <div className="relative z-10 p-5 bg-[#141824] border border-[#d4af37] shadow-2xl max-w-sm text-center">
              <div className="w-8 h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center mx-auto mb-2 font-bold text-xs shadow-lg shadow-[#d4af37]/30">
                IF
              </div>
              <h4 className="font-display font-bold text-base text-white uppercase">
                {BRAND_INFO.name}
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                {BRAND_INFO.address}
              </p>
              <div className="mt-3 pt-3 border-t border-[#232733] flex justify-center gap-4 text-[11px] text-[#d4af37]">
                <span>Valet Parking</span>
                <span aria-hidden="true">·</span>
                <span>Private Member Gate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Frequently Asked Inquiries
            </span>
            <h2 className="font-display font-bold text-3xl text-white uppercase tracking-tight mt-1">
              Common Questions & Answers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#10121a] border border-[#232733] transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#d4af37] font-bold">
                        0{idx + 1}.
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#d4af37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#1e232d] animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
