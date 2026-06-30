import type { SupabaseClient } from "@supabase/supabase-js";
import { loadSettings, type AppDatabase, type StudySettings } from "../database";
import { flushSyncQueue, restoreSyncSnapshot, type SyncStatus } from "../sync";

export type AppSyncResult = {
  status: SyncStatus;
  settings: StudySettings | null;
};

export async function syncAppDatabase(database: AppDatabase, supabase: SupabaseClient | null): Promise<AppSyncResult> {
  const flushStatus = await flushSyncQueue(database, supabase);
  const status = flushStatus === "error" ? flushStatus : await restoreSyncSnapshot(database, supabase);
  return {
    status,
    settings: status === "synced" ? await loadSettings(database) : null
  };
}
