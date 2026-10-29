import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getPublicDbEnv } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * Server-side client with the anon key. Row Level Security limits it to
 * published rows, so it is safe for public pages.
 */
export function createPublicClient() {
  const env = getPublicDbEnv();
  return createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
