import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env";

let client: SupabaseClient | null | undefined;
export type AppSupabaseClient = SupabaseClient | null;

export function createSupabaseClient(): AppSupabaseClient {
  if (client !== undefined) return client;
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    client = null;
    return client;
  }
  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: AsyncStorage
    }
  });
  return client;
}

export type { SupabaseClient };
