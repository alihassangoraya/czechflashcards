import type { StudySettings } from "../../../database";

export function createSettingsUpdater(settings: StudySettings, onChange: (settings: StudySettings) => void) {
  function update(patch: Partial<StudySettings>) {
    onChange({ ...settings, ...patch });
  }

  function updateNotifications(patch: Partial<StudySettings["notifications"]>) {
    update({ notifications: { ...settings.notifications, ...patch } });
  }

  function updateExamLevel(examLevel: StudySettings["examLevel"]) {
    update({
      examLevel,
      deckFilter: settings.deckFilter === "a2-focus" || settings.deckFilter === "b1-focus" ? `${examLevel}-focus` : settings.deckFilter
    });
  }

  function updateAppLanguage(appLanguage: StudySettings["appLanguage"]) {
    update({ appLanguage, meaningLanguage: appLanguage });
  }

  return { update, updateNotifications, updateExamLevel, updateAppLanguage };
}
