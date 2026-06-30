import { useEffect, useState } from "react";
import type { StudySettings } from "../../database";
import { normalizeReminderTime } from "./settingsFormat";

type Params = {
  settings: StudySettings;
  updateNotifications: (patch: Partial<StudySettings["notifications"]>) => void;
};

export function useReminderDraft({ settings, updateNotifications }: Params) {
  const [customReminderTime, setCustomReminderTime] = useState(settings.notifications.dailyReminderTime);

  useEffect(() => {
    setCustomReminderTime(settings.notifications.dailyReminderTime);
  }, [settings.notifications.dailyReminderTime]);

  function setReminderTime(value: string) {
    setCustomReminderTime(value);
    updateNotifications({ dailyReminderTime: value });
  }

  function commitCustomReminderTime() {
    const normalized = normalizeReminderTime(customReminderTime);
    if (normalized) setReminderTime(normalized);
    else setCustomReminderTime(settings.notifications.dailyReminderTime);
  }

  return { customReminderTime, setCustomReminderTime, setReminderTime, commitCustomReminderTime };
}
