import { createClient } from "@supabase/supabase-js";

// Uses Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

// We create a single supabase client for interacting with the database.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper to determine if we are in demo/fallback mode (i.e. Supabase not yet configured)
export const isDemoMode = 
  supabaseUrl.includes("placeholder-project") || 
  !import.meta.env.VITE_SUPABASE_URL;
