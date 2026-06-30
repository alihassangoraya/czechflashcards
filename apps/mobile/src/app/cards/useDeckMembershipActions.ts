import { useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import { addCardToCustomDeck, removeCardFromCustomDeck, type AppDatabase } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import type { Panel } from "../appTypes";
import { addDeckMembership, removeDeckMembership, type DeckMemberships } from "./deckMembershipState";

type Props = {
  db: AppDatabase | null;
  cards: Card[];
  setDeckMemberships: (deckMemberships: DeckMemberships | ((previous: DeckMemberships) => DeckMemberships)) => void;
  setPanel: (panel: Panel | null) => void;
  showToast: (message: string) => void;
};

export function useDeckMembershipActions({ db, cards, setDeckMemberships, setPanel, showToast }: Props) {
  const { t } = useI18n();
  const [deckManagementCard, setDeckManagementCardState] = useState<Card | null>(null);

  function setDeckManagementCard(card: Card | null) {
    setDeckManagementCardState(card);
    setPanel(card ? "deck" : null);
  }

  async function addCardToDeck(deckId: string, cardId: string) {
    if (!db) return;
    const card = cards.find((item) => item.id === cardId);
    setDeckMemberships((previous) => addDeckMembership(previous, deckId, cardId));
    await addCardToCustomDeck(db, deckId, cardId);
    showToast(t("toast.deckAdded", { word: card?.cz || t("toast.cardFallback") }));
  }

  async function removeCardFromDeck(deckId: string, cardId: string) {
    if (!db) return;
    const card = cards.find((item) => item.id === cardId);
    setDeckMemberships((previous) => removeDeckMembership(previous, deckId, cardId));
    await removeCardFromCustomDeck(db, deckId, cardId);
    showToast(t("toast.deckRemoved", { word: card?.cz || t("toast.cardFallback") }));
  }

  return { deckManagementCard, setDeckManagementCard, addCardToDeck, removeCardFromDeck };
}
