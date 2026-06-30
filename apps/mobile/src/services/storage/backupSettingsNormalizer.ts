import type { StudySettings } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import type { BackupPayload } from "./backupPayload";

export function normalizeRestoredSettings(settings: StudySettings | undefined, backup: BackupPayload): StudySettings {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    dailyGoal: Number(settings?.dailyGoal || backup.dailyGoal) || DEFAULT_SETTINGS.dailyGoal,
    examLevel: settings?.examLevel || backup.examLevel || DEFAULT_SETTINGS.examLevel,
    meaningLanguage: settings?.meaningLanguage || backup.meaningLanguage || DEFAULT_SETTINGS.meaningLanguage,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...settings?.notifications }
  };
}
