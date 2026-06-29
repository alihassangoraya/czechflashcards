import { useRef } from "react";
import type { Card } from "@czech-flashcards/shared";
import {
  addCustomCard,
  deleteCustomCard,
  loadSavedCardIds,
  setCardSaved,
  type AppDatabase
} from "../database";
import type { Panel } from "./appTypes";
import type { WordValues } from "./appShellTypes";
import { createCustomCard } from "./cardFactory";
import { useCardEditor } from "./useCardEditor";

type Props = {
  db: AppDatabase | null;
  cards: Card[];
  current: Card | null;
  panel: Panel | null;
  savedCardIds: Set<string>;
  setSavedCardIds: (savedCardIds: Set<string> | ((previous: Set<string>) => Set<string>)) => void;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  forceCard: (cardId: string, reveal?: boolean) => void;
  showToast: (message: string) => void;
};

export function useCardManagement({ db, cards, current, panel, savedCardIds, setSavedCardIds, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard, showToast }: Props) {
  const savingCardIds = useRef(new Set<string>());
  const editor = useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard });

  async function addWord(values: WordValues) {
    if (!db) return;
    if (!values.cz.trim() || !values.en.trim()) return;
    await addCustomCard(db, createCustomCard(values));
    await refresh(db);
  }

  async function deleteWord(cardId: string) {
    if (!db) return;
    await deleteCustomCard(db, cardId);
    await refresh(db);
  }

  async function toggleSavedCard(cardId: string, showFeedback = false) {
    if (!db || savingCardIds.current.has(cardId)) return;

    savingCardIds.current.add(cardId);
    const nextSaved = !savedCardIds.has(cardId);
    const card = cards.find((item) => item.id === cardId);
    setSavedCardIds((previous) => {
      const next = new Set(previous);
      if (nextSaved) next.add(cardId);
      else next.delete(cardId);
      return next;
    });
    if (showFeedback) showToast(nextSaved ? `${card?.cz || "Card"} added to starred.` : `${card?.cz || "Card"} removed from starred.`);

    try {
      await setCardSaved(db, cardId, nextSaved);
    } catch {
      setSavedCardIds(await loadSavedCardIds(db));
      if (showFeedback) showToast("Could not update starred card.");
    } finally {
      savingCardIds.current.delete(cardId);
    }
  }

  return {
    editingCard: editor.editingCard,
    addWord,
    deleteWord,
    toggleSavedCard,
    saveCorrection: editor.saveCorrection,
    openCardEditor: editor.openCardEditor,
    closeCardEditor: editor.closeCardEditor,
    studySearchResult: editor.studySearchResult
  };
}
