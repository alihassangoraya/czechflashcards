import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck, DeckMemberships } from "../../../database";

export function customDeckCardCount(deck: CustomDeck, cards: Card[], deckMemberships: DeckMemberships) {
  const membershipIds = new Set(deckMemberships[deck.id] || []);
  return cards.filter((card) => membershipIds.has(card.id) || card.tags.includes(deck.id)).length;
}
