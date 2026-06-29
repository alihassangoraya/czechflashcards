import { useEffect, useState } from "react";
import type { StudySettings } from "../../database";
import { normalizeReminderTime, slug } from "./settingsFormat";

export function useSettingsDraft(settings: StudySettings, onChange: (settings: StudySettings) => void) {
  const [deckName, setDeckName] = useState("");
  const [customReminderTime, setCustomReminderTime] = useState(settings.notifications.dailyReminderTime);

  useEffect(() => {
    setCustomReminderTime(settings.notifications.dailyReminderTime);
  }, [settings.notifications.dailyReminderTime]);

  function update(patch: Partial<StudySettings>) {
    onChange({ ...settings, ...patch });
  }

  function updateNotifications(patch: Partial<StudySettings["notifications"]>) {
    update({ notifications: { ...settings.notifications, ...patch } });
  }

  function setReminderTime(value: string) {
    setCustomReminderTime(value);
    updateNotifications({ dailyReminderTime: value });
  }

  function commitCustomReminderTime() {
    const normalized = normalizeReminderTime(customReminderTime);
    if (normalized) setReminderTime(normalized);
    else setCustomReminderTime(settings.notifications.dailyReminderTime);
  }

  function createDeck() {
    const name = deckName.trim().replace(/\s+/g, " ");
    if (!name || settings.customDecks.some((deck) => deck.name.toLowerCase() === name.toLowerCase())) return;
    const deck = { id: `deck-${slug(name)}-${Date.now()}`, name };
    update({ customDecks: [...settings.customDecks, deck], deckFilter: deck.id });
    setDeckName("");
  }

  function updateExamLevel(examLevel: StudySettings["examLevel"]) {
    update({
      examLevel,
      deckFilter: settings.deckFilter === "a2-focus" || settings.deckFilter === "b1-focus" ? `${examLevel}-focus` : settings.deckFilter
    });
  }

  return {
    deckName,
    customReminderTime,
    setDeckName,
    setCustomReminderTime,
    update,
    updateNotifications,
    setReminderTime,
    commitCustomReminderTime,
    createDeck,
    updateExamLevel
  };
}
