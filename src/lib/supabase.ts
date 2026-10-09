import { createClient } from "@supabase/supabase-js";

// Production GlowCare Supabase configuration
const DEFAULT_SUPABASE_URL = "https://cfpqmclxpojliccoubws.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcHFtY2x4cG9qbGljY291YndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4OTU2ODUsImV4cCI6MjEwMjQ3MTY4NX0.3W-YtZ9uIax1x_WaQHXkdRbNgclqXXppx7yqbcKubcI";

// Uses Vite's import.meta.env if provided, otherwise falls back to the live production database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Single Supabase client for interacting with the database and auth
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Production mode: live database and auth are active (never demo mode)
export const isDemoMode = false;
