import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDatabase } from "./database";
import { env } from "./env";

export type SyncStatus = "guest" | "not-configured" | "idle" | "synced" | "error";

export function createSupabaseClient(): SupabaseClient | null {
  if (!env.supabaseUrl || !env.supabaseAnonKey) return null;
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: AsyncStorage
    }
  });
}

export async function flushSyncQueue(db: AppDatabase, supabase: SupabaseClient | null): Promise<SyncStatus> {
  if (!supabase) return "not-configured";
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "guest";

  const rows = await db.getAllAsync<any>("SELECT * FROM sync_queue WHERE synced_at IS NULL ORDER BY id ASC LIMIT 100");
  if (!rows.length) return "idle";

  const payload = rows.map((row) => ({
    user_id: userData.user.id,
    local_id: row.id,
    event_type: row.type,
    payload: JSON.parse(row.payload_json),
    created_at_ms: row.created_at
  }));

  const { error } = await supabase.from("sync_events").insert(payload);
  if (error) return "error";

  const now = Date.now();
  await db.withTransactionAsync(async () => {
    for (const row of rows) {
      await db.runAsync("UPDATE sync_queue SET synced_at = ? WHERE id = ?", now, row.id);
    }
  });
  return "synced";
}
