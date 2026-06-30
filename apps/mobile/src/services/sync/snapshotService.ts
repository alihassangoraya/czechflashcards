import { persistDatabase, type AppDatabase } from "../storage/storagePublicApi";
import { applySyncSnapshot } from "./snapshotRestore";
import type { AppSupabaseClient } from "./supabaseClient";
import type { SyncSnapshot } from "./snapshotTypes";
import type { SyncStatus } from "./syncTypes";

export async function restoreSyncSnapshot(db: AppDatabase, supabase: AppSupabaseClient): Promise<SyncStatus> {
  if (!supabase) return "not-configured";
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "guest";
  const { data, error } = await supabase.rpc("sync_snapshot");
  if (error || !data) return "error";

  const snapshot = data as Partial<SyncSnapshot>;
  applySyncSnapshot(db, snapshot);
  await persistDatabase(db);
  return "synced";
}
