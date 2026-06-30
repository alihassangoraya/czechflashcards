import type { StudySettings } from "../../database";
import { useCustomDeckDraft } from "./useCustomDeckDraft";
import { useReminderDraft } from "./useReminderDraft";
import { createSettingsUpdater } from "./useSettingsUpdater";

export function useSettingsDraft(settings: StudySettings, onChange: (settings: StudySettings) => void) {
  const settingsUpdater = createSettingsUpdater(settings, onChange);
  const customDeckDraft = useCustomDeckDraft({ settings, update: settingsUpdater.update });
  const reminderDraft = useReminderDraft({ settings, updateNotifications: settingsUpdater.updateNotifications });

  return {
    ...settingsUpdater,
    ...customDeckDraft,
    ...reminderDraft
  };
}
