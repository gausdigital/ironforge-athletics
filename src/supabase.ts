import { createClient } from '@supabase/supabase-js';

// Supabase configuration
export const SUPABASE_PROJECT_ID = 'drdqjgpbhurvvvdttzjs';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_amCaJdd29VSSai0ciMuwnw_td67efUS';

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface BookingRecord {
  id?: string;
  confirmation_code: string;
  full_name: string;
  email: string;
  phone?: string;
  session_type: string;
  class_title?: string;
  trainer_name?: string;
  scheduled_date: string;
  time_window: string;
  experience_level?: string;
  notes?: string;
  created_at?: string;
  status?: string;
}

/**
 * SQL Schema definition provided for convenience if the table is not yet created in Supabase:
 */
export const SUPABASE_BOOKINGS_SQL = `
-- Run this in your Supabase SQL Editor if table 'bookings' doesn't exist:
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  confirmation_code text not null,
  full_name text not null,
  email text not null,
  phone text,
  session_type text not null,
  class_title text,
  trainer_name text,
  scheduled_date text not null,
  time_window text not null,
  experience_level text,
  notes text,
  status text default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Allow anonymous inserts so public website visitors can book appointments
create policy "Allow public bookings insert"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

-- Allow reading bookings
create policy "Allow public bookings select"
  on public.bookings
  for select
  to anon, authenticated
  using (true);
`;

/**
 * Saves a new booking appointment to Supabase 'bookings' table
 */
export async function saveBookingToSupabase(booking: BookingRecord): Promise<{
  success: boolean;
  data?: any;
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const payload = {
      confirmation_code: booking.confirmation_code,
      full_name: booking.full_name,
      email: booking.email,
      phone: booking.phone || '',
      session_type: booking.session_type,
      class_title: booking.class_title || '',
      trainer_name: booking.trainer_name || '',
      scheduled_date: booking.scheduled_date,
      time_window: booking.time_window,
      experience_level: booking.experience_level || '',
      notes: booking.notes || '',
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase insert warning:', error);
      // Check if table missing
      const isMissing =
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('relation "public.bookings" does not exist') ||
        error.message?.toLowerCase().includes('relation "bookings" does not exist');

      // Also persist to localStorage backup so appointments are never lost
      saveToLocalBackup(payload);

      return {
        success: false,
        error: error.message,
        isTableMissing: isMissing,
      };
    }

    // Also persist to local backup for offline resilience
    saveToLocalBackup(payload);

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error('Failed to save booking to Supabase:', err);
    return {
      success: false,
      error: err?.message || 'Network error connecting to Supabase',
    };
  }
}

/**
 * Local storage backup utility
 */
function saveToLocalBackup(record: any) {
  try {
    const existing = JSON.parse(localStorage.getItem('ironforge_bookings_backup') || '[]');
    existing.unshift(record);
    localStorage.setItem('ironforge_bookings_backup', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    // ignore local storage errors
  }
}

export function getLocalBookingsBackup(): BookingRecord[] {
  try {
    return JSON.parse(localStorage.getItem('ironforge_bookings_backup') || '[]');
  } catch (e) {
    return [];
  }
}
