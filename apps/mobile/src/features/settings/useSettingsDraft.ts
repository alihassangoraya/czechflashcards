import { useEffect, useState } from "react";
import type { StudySettings } from "../../database";
import { normalizeReminderTime, slug } from "./settingsFormat";

export function useSettingsDraft(settings: StudySettings, onChange: (settings: StudySettings) => void) {
  const [deckName, setDeckName] = useState("");
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editingDeckName, setEditingDeckName] = useState("");
  const [deleteDeckId, setDeleteDeckId] = useState<string | null>(null);
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

  function startEditingDeck(deckId: string) {
    const deck = settings.customDecks.find((item) => item.id === deckId);
    if (!deck) return;
    setEditingDeckId(deck.id);
    setEditingDeckName(deck.name);
    setDeleteDeckId(null);
  }

  function cancelEditingDeck() {
    setEditingDeckId(null);
    setEditingDeckName("");
  }

  function saveEditingDeck() {
    if (!editingDeckId) return;
    const name = editingDeckName.trim().replace(/\s+/g, " ");
    if (!name) return;
    const duplicate = settings.customDecks.some((deck) => deck.id !== editingDeckId && deck.name.toLowerCase() === name.toLowerCase());
    if (duplicate) return;
    update({ customDecks: settings.customDecks.map((deck) => deck.id === editingDeckId ? { ...deck, name } : deck) });
    cancelEditingDeck();
  }

  function deleteDeck(deckId: string) {
    const nextDecks = settings.customDecks.filter((deck) => deck.id !== deckId);
    update({
      customDecks: nextDecks,
      deckFilter: settings.deckFilter === deckId ? `${settings.examLevel}-focus` : settings.deckFilter
    });
    if (editingDeckId === deckId) cancelEditingDeck();
    setDeleteDeckId(null);
  }

  function updateExamLevel(examLevel: StudySettings["examLevel"]) {
    update({
      examLevel,
      deckFilter: settings.deckFilter === "a2-focus" || settings.deckFilter === "b1-focus" ? `${examLevel}-focus` : settings.deckFilter
    });
  }

  return {
    deckName,
    editingDeckId,
    editingDeckName,
    deleteDeckId,
    customReminderTime,
    setDeckName,
    setEditingDeckName,
    setDeleteDeckId,
    setCustomReminderTime,
    update,
    updateNotifications,
    setReminderTime,
    commitCustomReminderTime,
    createDeck,
    startEditingDeck,
    cancelEditingDeck,
    saveEditingDeck,
    deleteDeck,
    updateExamLevel
  };
}
