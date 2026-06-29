import type { AppDatabase, StudySettings } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import { persistDatabase } from "./storageCore";
import { enqueueSync } from "./syncQueueRepository";

export async function loadSettings(db: AppDatabase): Promise<StudySettings> {
  return {
    ...DEFAULT_SETTINGS,
    ...db.store.settings,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...db.store.settings?.notifications }
  };
}

export async function saveSettings(db: AppDatabase, settings: StudySettings): Promise<void> {
  db.store.settings = settings;
  await persistDatabase(db);
  await enqueueSync(db, "settings_updated", { settings });
}
