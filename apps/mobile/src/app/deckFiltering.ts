import { filterDeck, type Card } from "@czech-flashcards/shared";
import type { CustomDeck, StudySettings } from "../database";

export function filterStudyDeck(
  cards: Card[],
  settings: StudySettings,
  savedDeckIds: ReadonlySet<string>,
  deckMemberships: Record<string, string[]>
) {
  const customDeckIds = new Set(settings.customDecks.map((deck) => deck.id));
  if (!customDeckIds.has(settings.deckFilter)) {
    return filterDeck(cards, settings.examLevel, settings.deckFilter, savedDeckIds);
  }

  const membershipIds = new Set(deckMemberships[settings.deckFilter] || []);
  return cards.filter((card) => membershipIds.has(card.id) || card.tags.includes(settings.deckFilter));
}

export function customDeckCardCount(deck: CustomDeck, cards: Card[], deckMemberships: Record<string, string[]>) {
  const membershipIds = new Set(deckMemberships[deck.id] || []);
  return cards.filter((card) => membershipIds.has(card.id) || card.tags.includes(deck.id)).length;
}
