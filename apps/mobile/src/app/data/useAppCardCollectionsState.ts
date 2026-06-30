import { useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, SavedCardIds } from "../../database";

export function useAppCardCollectionsState() {
  const [cards, setCards] = useState<Card[]>([]);
  const [savedCardIds, setSavedCardIds] = useState<SavedCardIds>(new Set());
  const [deckMemberships, setDeckMemberships] = useState<DeckMemberships>({});

  return { cards, savedCardIds, deckMemberships, setCards, setSavedCardIds, setDeckMemberships };
}
