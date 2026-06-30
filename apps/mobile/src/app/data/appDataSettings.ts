import { saveSettings, type AppDatabase, type StudySettings } from "../../database";
import { configureLocalNotifications } from "../../services/notifications";
import type { AppDataState } from "./appDataStateTypes";

export async function persistAppSettings(state: AppDataState, database: AppDatabase | null, next: StudySettings): Promise<void> {
  if (!database) return;
  state.setSettingsState(next);
  await saveSettings(database, next);
  await configureLocalNotifications(next.notifications);
}
