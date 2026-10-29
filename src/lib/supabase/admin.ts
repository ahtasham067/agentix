import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getAdminEnv } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * Server-side client with the service role key. It bypasses Row Level
 * Security, so it is only used by server actions and never reaches the browser.
 */
export function createAdminClient() {
  const env = getAdminEnv();
  return createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
