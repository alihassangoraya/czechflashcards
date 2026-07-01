import type { StudySettings } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import type { BackupPayload } from "./backupPayload";

export function normalizeRestoredSettings(settings: StudySettings | undefined, backup: BackupPayload): StudySettings {
  const appLanguage = settings?.appLanguage || DEFAULT_SETTINGS.appLanguage;
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    dailyGoal: Number(settings?.dailyGoal || backup.dailyGoal) || DEFAULT_SETTINGS.dailyGoal,
    examLevel: settings?.examLevel || backup.examLevel || DEFAULT_SETTINGS.examLevel,
    appLanguage,
    meaningLanguage: appLanguage,
    themeMode: settings?.themeMode || DEFAULT_SETTINGS.themeMode,
    notifications: { ...DEFAULT_SETTINGS.notifications, ...settings?.notifications }
  };
}
