"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/integrations/supabase/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
    "Make sure these are set in your environment variables."
  );
}

export function createClient() {
  return createBrowserClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!
  );
}
