import { useRef, useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import {
  addCardToCustomDeck,
  addCustomCard,
  deleteCustomCard,
  loadSavedCardIds,
  removeCardFromCustomDeck,
  setCardSaved,
  type AppDatabase
} from "../database";
import type { Panel } from "./appTypes";
import type { WordValues } from "./appShellTypes";
import { useI18n } from "../i18n/I18nProvider";
import { createCustomCard } from "./cardFactory";
import { useCardEditor } from "./useCardEditor";

type Props = {
  db: AppDatabase | null;
  cards: Card[];
  current: Card | null;
  panel: Panel | null;
  savedCardIds: Set<string>;
  setSavedCardIds: (savedCardIds: Set<string> | ((previous: Set<string>) => Set<string>)) => void;
  setDeckMemberships: (deckMemberships: Record<string, string[]> | ((previous: Record<string, string[]>) => Record<string, string[]>)) => void;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  forceCard: (cardId: string, reveal?: boolean) => void;
  showToast: (message: string) => void;
};

export function useCardManagement({ db, cards, current, panel, savedCardIds, setSavedCardIds, setDeckMemberships, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard, showToast }: Props) {
  const { t } = useI18n();
  const savingCardIds = useRef(new Set<string>());
  const [deckManagementCard, setDeckManagementCardState] = useState<Card | null>(null);
  const editor = useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard });

  async function addWord(values: WordValues) {
    if (!db) return;
    if (!values.cz.trim() || !values.en.trim()) return;
    const card = createCustomCard(values);
    await addCustomCard(db, card);
    if (values.tag.startsWith("deck-")) await addCardToCustomDeck(db, values.tag, card.id);
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
    const word = card?.cz || t("toast.cardFallback");
    if (showFeedback) showToast(nextSaved ? t("toast.starredAdded", { word }) : t("toast.starredRemoved", { word }));

    try {
      await setCardSaved(db, cardId, nextSaved);
    } catch {
      setSavedCardIds(await loadSavedCardIds(db));
      if (showFeedback) showToast(t("toast.starredFailed"));
    } finally {
      savingCardIds.current.delete(cardId);
    }
  }

  function setDeckManagementCard(card: Card | null) {
    setDeckManagementCardState(card);
    setPanel(card ? "deck" : null);
  }

  async function addCardToDeck(deckId: string, cardId: string) {
    if (!db) return;
    const card = cards.find((item) => item.id === cardId);
    setDeckMemberships((previous) => {
      const nextIds = new Set(previous[deckId] || []);
      nextIds.add(cardId);
      return { ...previous, [deckId]: [...nextIds] };
    });
    await addCardToCustomDeck(db, deckId, cardId);
    showToast(t("toast.deckAdded", { word: card?.cz || t("toast.cardFallback") }));
  }

  async function removeCardFromDeck(deckId: string, cardId: string) {
    if (!db) return;
    const card = cards.find((item) => item.id === cardId);
    setDeckMemberships((previous) => {
      const nextIds = new Set(previous[deckId] || []);
      nextIds.delete(cardId);
      return { ...previous, [deckId]: [...nextIds] };
    });
    await removeCardFromCustomDeck(db, deckId, cardId);
    showToast(t("toast.deckRemoved", { word: card?.cz || t("toast.cardFallback") }));
  }

  return {
    editingCard: editor.editingCard,
    deckManagementCard,
    addWord,
    deleteWord,
    toggleSavedCard,
    addCardToDeck,
    removeCardFromDeck,
    setDeckManagementCard,
    saveCorrection: editor.saveCorrection,
    openCardEditor: editor.openCardEditor,
    closeCardEditor: editor.closeCardEditor,
    studySearchResult: editor.studySearchResult
  };
}
