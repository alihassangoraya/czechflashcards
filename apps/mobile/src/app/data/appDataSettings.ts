import { saveSettings, type AppDatabase, type StudySettings } from "../../database";
import { configureLocalNotifications } from "../../services/notifications";
import { applyThemePreference } from "../../theme/applyThemePreference";
import { startupThemeMode } from "../../theme/design";
import { reloadForThemeChange } from "../../theme/themeReload";
import type { AppDataState } from "./appDataStateTypes";

export async function persistAppSettings(state: AppDataState, database: AppDatabase | null, next: StudySettings): Promise<void> {
  const themeChanged = state.settings?.themeMode !== next.themeMode;
  const resolvedThemeMode = applyThemePreference(next.themeMode);
  state.setSettingsState(next);
  if (!database) return;
  await saveSettings(database, next);
  await configureLocalNotifications(next.notifications);

  if (themeChanged && resolvedThemeMode !== startupThemeMode) reloadForThemeChange();
}
