import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppDatabase } from "../database";
import { refreshAppData } from "./appDataRefresh";
import { syncAppDatabase } from "./appDataSync";
import type { AppDataState } from "./appDataState";

export async function syncAppDataNow(
  state: AppDataState,
  database: AppDatabase | null,
  supabase: SupabaseClient | null,
  dailyGoal = 30
): Promise<void> {
  if (!database) return;
  const result = await syncAppDatabase(database, supabase);
  state.setSyncStatus(result.status);
  if (result.settings) state.setSettingsState(result.settings);
  await refreshAppData(state, database, dailyGoal);
}
