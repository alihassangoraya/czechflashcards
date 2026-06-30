import { useMemo } from "react";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";
import { filterStudyDeck } from "./deckFiltering";

const EMPTY_SAVED_CARD_IDS = new Set<string>();

export function useFilteredStudyDeck(
  cards: Card[],
  settings: StudySettings | null,
  savedCardIds: Set<string>,
  deckMemberships: Record<string, string[]>
) {
  const savedDeckIds = settings?.deckFilter === "saved" ? savedCardIds : null;
  return useMemo(() => {
    if (!settings) return [];
    return filterStudyDeck(cards, settings, savedDeckIds || EMPTY_SAVED_CARD_IDS, deckMemberships);
  }, [cards, deckMemberships, savedDeckIds, settings]);
}
