-- Schema for GlowCare Clinic Admin Panel

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Services Table
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  icon_name text not null,
  benefits jsonb not null default '[]'::jsonb,
  duration_mins integer not null default 30,
  price integer,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Business Hours Table
create table if not exists public.business_hours (
  id uuid default uuid_generate_v4() primary key,
  day_of_week integer not null unique, -- 0 (Sun) to 6 (Sat)
  day_name text not null,
  is_open boolean not null default true,
  open_time time without time zone not null default '09:00:00',
  close_time time without time zone not null default '20:00:00',
  slot_duration_mins integer not null default 30,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Blocked Dates Table
create table if not exists public.blocked_dates (
  id uuid default uuid_generate_v4() primary key,
  date date not null unique,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Clinic Settings Table
create table if not exists public.clinic_settings (
  key text primary key,
  value jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Website Content Table
create table if not exists public.website_content (
  section_key text primary key,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Appointments Table
create table if not exists public.appointments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  patient_name text not null,
  patient_phone text not null,
  patient_email text not null,
  service_title text not null,
  service_id uuid references public.services(id),
  appointment_date date not null,
  appointment_time text not null, -- e.g., "10:00 AM"
  notes text,
  admin_notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- 7. Admin Profiles
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) setup
alter table public.services enable row level security;
alter table public.business_hours enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.clinic_settings enable row level security;
alter table public.website_content enable row level security;
alter table public.appointments enable row level security;
alter table public.profiles enable row level security;

-- Create policies for public read access (everything except appointments & profiles)
create policy "Allow public read access on services" on public.services for select using (true);
create policy "Allow public read access on business_hours" on public.business_hours for select using (true);
create policy "Allow public read access on blocked_dates" on public.blocked_dates for select using (true);
create policy "Allow public read access on clinic_settings" on public.clinic_settings for select using (true);
create policy "Allow public read access on website_content" on public.website_content for select using (true);

-- Allow public to insert appointments
create policy "Allow public to insert appointments" on public.appointments for insert with check (true);

-- Admin has full access to everything
-- Helper function to check admin role
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Admin policies
create policy "Admin full access on services" on public.services to authenticated using (is_admin()) with check (is_admin());
create policy "Admin full access on business_hours" on public.business_hours to authenticated using (is_admin()) with check (is_admin());
create policy "Admin full access on blocked_dates" on public.blocked_dates to authenticated using (is_admin()) with check (is_admin());
create policy "Admin full access on clinic_settings" on public.clinic_settings to authenticated using (is_admin()) with check (is_admin());
create policy "Admin full access on website_content" on public.website_content to authenticated using (is_admin()) with check (is_admin());
create policy "Admin full access on appointments" on public.appointments to authenticated using (is_admin()) with check (is_admin());
create policy "Admin full access on profiles" on public.profiles to authenticated using (is_admin()) with check (is_admin());

-- Seed data for business hours (default Mon-Sat 9-8)
insert into public.business_hours (day_of_week, day_name, is_open, open_time, close_time, slot_duration_mins)
values 
  (0, 'Sunday', false, '09:00:00', '20:00:00', 30),
  (1, 'Monday', true, '09:00:00', '20:00:00', 30),
  (2, 'Tuesday', true, '09:00:00', '20:00:00', 30),
  (3, 'Wednesday', true, '09:00:00', '20:00:00', 30),
  (4, 'Thursday', true, '09:00:00', '20:00:00', 30),
  (5, 'Friday', true, '09:00:00', '20:00:00', 30),
  (6, 'Saturday', true, '09:00:00', '20:00:00', 30)
on conflict (day_of_week) do nothing;

-- Function to handle new user signup automatically placing them in profiles
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. Storage Bucket for Clinic Assets
insert into storage.buckets (id, name, public)
values ('clinic-assets', 'clinic-assets', true)
on conflict (id) do nothing;

create policy "Public Access to Assets" on storage.objects
  for select using (bucket_id = 'clinic-assets');

create policy "Admin Upload Assets" on storage.objects
  for insert with check (bucket_id = 'clinic-assets');

