import { saveSettings, type AppDatabase, type StudySettings } from "../../database";
import { configureLocalNotifications } from "../../services/notifications";
import { applyThemePreference } from "../../theme/applyThemePreference";
import type { AppDataState } from "./appDataStateTypes";

export async function persistAppSettings(state: AppDataState, database: AppDatabase | null, next: StudySettings): Promise<void> {
  applyThemePreference(next.themeMode);
  state.setSettingsState(next);
  if (!database) return;
  await saveSettings(database, next);
  await configureLocalNotifications(next.notifications);
}
