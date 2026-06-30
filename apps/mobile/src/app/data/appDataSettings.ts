import { Platform } from "react-native";
import { saveSettings, type AppDatabase, type StudySettings } from "../../database";
import { configureLocalNotifications } from "../../services/notifications";
import { startupThemeMode } from "../../theme/design";
import { resolveThemePreference } from "../../theme/systemThemeMode";
import { writeStoredThemePreference } from "../../theme/themeModePersistence";
import type { AppDataState } from "./appDataStateTypes";

export async function persistAppSettings(state: AppDataState, database: AppDatabase | null, next: StudySettings): Promise<void> {
  if (!database) return;
  const resolvedThemeMode = resolveThemePreference(next.themeMode);
  writeStoredThemePreference(next.themeMode);
  state.setSettingsState(next);
  await saveSettings(database, next);
  await configureLocalNotifications(next.notifications);

  if (Platform.OS === "web" && resolvedThemeMode !== startupThemeMode && typeof window !== "undefined") {
    window.location.reload();
  }
}
