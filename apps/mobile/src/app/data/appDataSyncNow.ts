import type { AppDatabase } from "../../database";
import type { AppSupabaseClient, SyncStatus } from "../../sync";
import { refreshAppData } from "./appDataRefresh";
import { syncAppDatabase } from "./appDataSync";
import type { AppDataState } from "./appDataStateTypes";

export async function syncAppDataNow(
  state: AppDataState,
  database: AppDatabase | null,
  supabase: AppSupabaseClient,
  dailyGoal = 30
): Promise<SyncStatus | null> {
  if (!database) return null;
  const result = await syncAppDatabase(database, supabase);
  state.setSyncStatus(result.status);
  if (result.settings) state.setSettingsState(result.settings);
  await refreshAppData(state, database, dailyGoal);
  return result.status;
}
