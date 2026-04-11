import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(
  typeof url === "string" && url.length > 0 && typeof anonKey === "string" && anonKey.length > 0,
);

/** @type {import('@supabase/supabase-js').SupabaseClient | null} */
export const supabase = supabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null;
