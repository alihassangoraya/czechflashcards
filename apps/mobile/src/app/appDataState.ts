import { useState } from "react";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../database";
import type { SyncStatus } from "../sync";
import type { AppDataSnapshot } from "./appDataSnapshot";

export function useAppDataState() {
  const [db, setDb] = useState<AppDatabase | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [savedCardIds, setSavedCardIds] = useState<Set<string>>(new Set());
  const [deckMemberships, setDeckMemberships] = useState<Record<string, string[]>>({});
  const [states, setStates] = useState<Record<string, ReviewState>>({});
  const [settings, setSettingsState] = useState<StudySettings | null>(null);
  const [dailyProgress, setDailyProgress] = useState("0 / 30");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);

  function applySnapshot(snapshot: AppDataSnapshot) {
    setCards(snapshot.cards);
    setSavedCardIds(snapshot.savedCardIds);
    setDeckMemberships(snapshot.deckMemberships);
    setStates(snapshot.states);
    setDailyProgress(snapshot.dailyProgress);
  }

  return {
    db,
    cards,
    savedCardIds,
    deckMemberships,
    states,
    settings,
    dailyProgress,
    syncStatus,
    accountEmail,
    setDb,
    setCards,
    setSavedCardIds,
    setDeckMemberships,
    setStates,
    setSettingsState,
    setSyncStatus,
    setAccountEmail,
    applySnapshot
  };
}
