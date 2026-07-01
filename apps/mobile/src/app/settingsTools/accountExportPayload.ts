import { exportBackup, type AppDatabase, type StudySettings } from "../../database";
import type { AppSupabaseClient } from "../../sync";

type Params = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  accountEmail: string | null;
  supabase: AppSupabaseClient;
};

export async function buildAccountExportPayload({ db, settings, accountEmail, supabase }: Params) {
  const local = db ? exportBackup(db) : null;
  const remote = supabase ? await loadRemoteSnapshot(supabase) : null;
  return { exportedAt: new Date().toISOString(), accountEmail, settings, local, remote };
}

async function loadRemoteSnapshot(supabase: NonNullable<AppSupabaseClient>) {
  const { data, error } = await supabase.rpc("sync_snapshot");
  if (error) return { error: error.message };
  return data;
}
