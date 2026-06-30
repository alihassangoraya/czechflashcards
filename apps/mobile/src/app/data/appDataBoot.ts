import type { SupabaseClient } from "@supabase/supabase-js";
import { loadSettings } from "../../database";
import { configureLocalNotifications } from "../../notifications";
import { openSeededDatabase } from "./appDataSnapshot";
import { syncAppDatabase } from "./appDataSync";
import { refreshAppData } from "./appDataRefresh";
import type { AppDataState } from "./appDataState";

export async function bootAppData(state: AppDataState, supabase: SupabaseClient | null): Promise<void> {
  const database = await openSeededDatabase();
  const settings = await loadSettings(database);
  state.setDb(database);
  state.setSettingsState(settings);
  await refreshAppData(state, database, settings.dailyGoal);
  await configureLocalNotifications(settings.notifications);

  if (supabase) {
    const { data } = await supabase.auth.getSession();
    state.setAccountEmail(data.session?.user.email || null);
  }

  const syncResult = await syncAppDatabase(database, supabase);
  state.setSyncStatus(syncResult.status);
  if (syncResult.settings) state.setSettingsState(syncResult.settings);
}
