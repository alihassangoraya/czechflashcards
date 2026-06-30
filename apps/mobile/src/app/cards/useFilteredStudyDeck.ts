import { useMemo } from "react";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";
import type { DeckMemberships } from "./deckMembershipState";
import { filterStudyDeck } from "./deckFiltering";
import type { SavedCardIds } from "./savedCardState";

const EMPTY_SAVED_CARD_IDS: SavedCardIds = new Set();

export function useFilteredStudyDeck(
  cards: Card[],
  settings: StudySettings | null,
  savedCardIds: SavedCardIds,
  deckMemberships: DeckMemberships
) {
  const savedDeckIds = settings?.deckFilter === "saved" ? savedCardIds : null;
  return useMemo(() => {
    if (!settings) return [];
    return filterStudyDeck(cards, settings, savedDeckIds || EMPTY_SAVED_CARD_IDS, deckMemberships);
  }, [cards, deckMemberships, savedDeckIds, settings]);
}
