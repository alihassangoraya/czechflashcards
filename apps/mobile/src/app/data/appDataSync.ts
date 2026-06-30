import { loadSettings, type AppDatabase, type StudySettings } from "../../database";
import { flushSyncQueue, restoreSyncSnapshot, type AppSupabaseClient, type SyncStatus } from "../../sync";

export type AppSyncResult = {
  status: SyncStatus;
  settings: StudySettings | null;
};

export async function syncAppDatabase(database: AppDatabase, supabase: AppSupabaseClient): Promise<AppSyncResult> {
  const flushStatus = await flushSyncQueue(database, supabase);
  const status = flushStatus === "error" ? flushStatus : await restoreSyncSnapshot(database, supabase);
  return {
    status,
    settings: status === "synced" ? await loadSettings(database) : null
  };
}
