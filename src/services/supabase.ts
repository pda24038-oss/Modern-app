import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  const metaEnv = (import.meta as any).env;
  const supabaseUrl = metaEnv?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = metaEnv?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    console.warn('Supabase URL is missing or invalid. Database features will be disabled.');
    // Return a mock or handle gracefully in components
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};

// For backward compatibility in the code, but we should use getSupabase()
export const supabase = getSupabase();
