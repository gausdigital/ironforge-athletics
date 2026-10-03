import React, { useState, useEffect } from 'react';
import { X, Database, RefreshCw, Calendar, Clock, User, Phone, Mail, CheckCircle2, Search, Dumbbell, AlertCircle, Copy, Check } from 'lucide-react';
import { supabase, BookingRecord, SUPABASE_PROJECT_ID, SUPABASE_BOOKINGS_SQL, getLocalBookingsBackup } from '../lib/supabase';

interface AdminBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminBookingsModal: React.FC<AdminBookingsModalProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isTableMissing, setIsTableMissing] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [showSql, setShowSql] = useState<boolean>(false);

  const fetchBookings = async () => {
    setLoading(true);
    setErrorMsg(null);
    setIsTableMissing(false);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase query error:', error);
        setErrorMsg(error.message);
        if (
          error.code === '42P01' ||
          error.message?.toLowerCase().includes('does not exist')
        ) {
          setIsTableMissing(true);
        }
        // Fallback to local storage backup
        const local = getLocalBookingsBackup();
        setBookings(local);
      } else if (data) {
        setBookings(data);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Connection failed');
      const local = getLocalBookingsBackup();
      setBookings(local);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    const q = searchTerm.toLowerCase();
    return (
      b.full_name?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.confirmation_code?.toLowerCase().includes(q) ||
      b.class_title?.toLowerCase().includes(q) ||
      b.trainer_name?.toLowerCase().includes(q)
    );
  });

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_BOOKINGS_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f1118] border border-[#232733] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232733] bg-[#141824]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-[#d4af37] bg-[#0b0c10] flex items-center justify-center text-[#d4af37]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                  Supabase Appointments Database
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase">
                  Connected
                </span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Project: {SUPABASE_PROJECT_ID} · Table: public.bookings
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1f2535] rounded transition-colors cursor-pointer"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#d4af37]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1f2535] rounded transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:px-6 bg-[#10131d] border-b border-[#232733] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search by athlete name, email, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#141824] border border-[#232733] text-white text-xs pl-8 pr-3 py-2 focus:outline-none focus:border-[#d4af37]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-neutral-400">
              Total Recorded: <strong className="text-white font-mono">{bookings.length}</strong>
            </span>
            <button
              onClick={() => setShowSql(!showSql)}
              className="px-3 py-1.5 bg-[#141824] hover:bg-[#1d2333] border border-[#232733] text-neutral-300 text-xs rounded transition-colors"
            >
              {showSql ? 'Hide SQL Script' : 'Supabase SQL Setup'}
            </button>
          </div>
        </div>

        {/* SQL instructions banner if requested or table missing */}
        {(showSql || isTableMissing) && (
          <div className="p-4 bg-[#090b10] border-b border-[#232733] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Supabase SQL Setup Script
              </span>
              <button
                onClick={copySql}
                className="px-2.5 py-1 bg-[#141824] hover:bg-[#202534] border border-[#232733] text-xs text-white rounded flex items-center gap-1.5"
              >
                {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-neutral-400" />}
                <span>{copiedSql ? 'Copied to Clipboard' : 'Copy SQL'}</span>
              </button>
            </div>
            <p className="text-[11px] text-neutral-400">
              If the <code className="text-white">bookings</code> table is not yet created in your Supabase project, open your Supabase Dashboard &gt; <strong>SQL Editor</strong> &gt; <strong>New Query</strong>, paste this script, and click <strong>Run</strong>.
            </p>
            <pre className="p-3 bg-[#050608] border border-[#1e232d] text-[10px] text-neutral-300 font-mono overflow-x-auto max-h-36">
              {SUPABASE_BOOKINGS_SQL.trim()}
            </pre>
          </div>
        )}

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#d4af37] mx-auto" />
              <p className="text-xs text-neutral-400">Loading appointments from Supabase...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center space-y-3 border border-dashed border-[#232733] p-8">
              <Calendar className="w-10 h-10 text-neutral-600 mx-auto" />
              <h4 className="font-display font-bold text-base text-white uppercase">
                No Appointments Recorded Yet
              </h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Any session booked via the "Reserve Session / Class" modal will immediately synchronize and appear in this Supabase database feed.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((item, idx) => (
                <div
                  key={item.id || item.confirmation_code || idx}
                  className="p-4 bg-[#141824] border border-[#232733] hover:border-[#d4af37]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-[#d4af37] text-xs">
                        {item.confirmation_code}
                      </span>
                      <span className="px-2 py-0.5 bg-[#0b0c10] border border-white/10 uppercase tracking-wider text-[10px] text-neutral-300">
                        {item.session_type}
                      </span>
                      {item.class_title && (
                        <span className="text-white font-semibold">
                          {item.class_title}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#d4af37]" />
                        <strong className="text-white">{item.full_name}</strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-neutral-400 italic text-[11px] pt-1">
                        Note: "{item.notes}"
                      </p>
                    )}
                  </div>

                  <div className="md:text-right shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-[#232733] space-y-1">
                    <div className="flex items-center md:justify-end gap-1.5 text-white font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{item.scheduled_date}</span>
                      <span>·</span>
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{item.time_window}</span>
                    </div>
                    {item.trainer_name && (
                      <span className="text-neutral-400 text-[11px] block">
                        Coach: {item.trainer_name}
                      </span>
                    )}
                    <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider inline-block">
                      Status: {item.status || 'Confirmed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#232733] bg-[#10131d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Supabase API Key & Storage Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e5a93c] transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
