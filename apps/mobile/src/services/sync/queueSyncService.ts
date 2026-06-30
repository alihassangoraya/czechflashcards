import { persistDatabase, type AppDatabase } from "../storage/storagePublicApi";
import type { AppSupabaseClient } from "./supabaseClient";
import type { SyncStatus } from "./syncTypes";

export async function flushSyncQueue(db: AppDatabase, supabase: AppSupabaseClient): Promise<SyncStatus> {
  if (!supabase) return "not-configured";
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "guest";

  const rows = db.store.syncQueue.filter((entry) => !entry.syncedAt).sort((left, right) => left.id - right.id).slice(0, 100);
  if (!rows.length) return "idle";

  const payload = rows.map((row) => ({
    user_id: userData.user.id,
    local_id: row.id,
    event_type: row.type,
    payload: row.payload,
    created_at_ms: row.createdAt
  }));

  const { error } = await supabase.from("sync_events").insert(payload);
  if (error) return "error";

  const now = Date.now();
  for (const row of rows) row.syncedAt = now;
  await persistDatabase(db);
  return "synced";
}
