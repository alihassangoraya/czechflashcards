import { useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../i18n/I18nProvider";
import { addDeckMembership, removeDeckMembership } from "./deckMembershipState";
import { persistDeckMembershipAdd, persistDeckMembershipRemoval } from "./deckMembershipPersistence";
import type { DeckMembershipActionProps } from "./deckMembershipTypes";

export function useDeckMembershipActions({ db, cards, setDeckMemberships, setPanel, showToast }: DeckMembershipActionProps) {
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
    await persistDeckMembershipAdd({ db, deckId, cardId });
    showToast(t("toast.deckAdded", { word: card?.cz || t("toast.cardFallback") }));
  }

  async function removeCardFromDeck(deckId: string, cardId: string) {
    if (!db) return;
    const card = cards.find((item) => item.id === cardId);
    setDeckMemberships((previous) => removeDeckMembership(previous, deckId, cardId));
    await persistDeckMembershipRemoval({ db, deckId, cardId });
    showToast(t("toast.deckRemoved", { word: card?.cz || t("toast.cardFallback") }));
  }

  return { deckManagementCard, setDeckManagementCard, addCardToDeck, removeCardFromDeck };
}
