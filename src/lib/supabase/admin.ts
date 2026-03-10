import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client that bypasses RLS.
 * Only use in server-side code (API routes, server actions) for
 * operations that need elevated privileges (e.g. linking student
 * records during auth callback).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
