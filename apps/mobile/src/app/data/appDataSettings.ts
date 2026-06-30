import { Platform } from "react-native";
import { saveSettings, type AppDatabase, type StudySettings } from "../../database";
import { configureLocalNotifications } from "../../services/notifications";
import { startupThemeMode } from "../../theme/design";
import { writeStoredThemeMode } from "../../theme/themeModePersistence";
import type { AppDataState } from "./appDataStateTypes";

export async function persistAppSettings(state: AppDataState, database: AppDatabase | null, next: StudySettings): Promise<void> {
  if (!database) return;
  writeStoredThemeMode(next.themeMode);
  state.setSettingsState(next);
  await saveSettings(database, next);
  await configureLocalNotifications(next.notifications);

  if (Platform.OS === "web" && next.themeMode !== startupThemeMode && typeof window !== "undefined") {
    window.location.reload();
  }
}
