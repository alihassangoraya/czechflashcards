import { filterDeck, type Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";
import type { DeckMemberships } from "./deckMembershipState";
import type { SavedCardIds } from "./savedCardState";

export function filterStudyDeck(
  cards: Card[],
  settings: StudySettings,
  savedDeckIds: SavedCardIds,
  deckMemberships: DeckMemberships
) {
  const customDeckIds = new Set(settings.customDecks.map((deck) => deck.id));
  if (!customDeckIds.has(settings.deckFilter)) {
    return filterDeck(cards, settings.examLevel, settings.deckFilter, savedDeckIds);
  }

  const membershipIds = new Set(deckMemberships[settings.deckFilter] || []);
  return cards.filter((card) => membershipIds.has(card.id) || card.tags.includes(settings.deckFilter));
}
