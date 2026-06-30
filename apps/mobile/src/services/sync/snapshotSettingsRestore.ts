import { DEFAULT_SETTINGS, type AppDatabase, type StudySettings } from "../storage/storagePublicApi";

export function applySettingsSnapshot(db: AppDatabase, settings?: Partial<StudySettings> | StudySettings[]) {
  if (!settings || Array.isArray(settings) || !Object.keys(settings).length) return;
  db.store.settings = { ...DEFAULT_SETTINGS, ...db.store.settings, ...settings };
}
