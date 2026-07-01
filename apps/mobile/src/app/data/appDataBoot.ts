import { loadSettings } from "../../database";
import type { AppSupabaseClient } from "../../sync";
import { configureLocalNotifications } from "../../services/notifications";
import { openSeededDatabase } from "./appDatabaseBootstrap";
import { syncAppDatabase } from "./appDataSync";
import { refreshAppData } from "./appDataRefresh";
import type { AppDataState } from "./appDataStateTypes";
import { userDisplayName } from "./userDisplayName";

export async function bootAppData(state: AppDataState, supabase: AppSupabaseClient): Promise<void> {
  const database = await openSeededDatabase();
  const settings = await loadSettings(database);
  state.setDb(database);
  state.setSettingsState(settings);
  await refreshAppData(state, database, settings.dailyGoal);
  await configureLocalNotifications(settings.notifications);

  if (supabase) {
    const { data } = await supabase.auth.getSession();
    state.setAccountEmail(data.session?.user.email || null);
    state.setAccountName(userDisplayName(data.session?.user));
  }

  const syncResult = await syncAppDatabase(database, supabase);
  state.setSyncStatus(syncResult.status);
  if (syncResult.settings) state.setSettingsState(syncResult.settings);
}
