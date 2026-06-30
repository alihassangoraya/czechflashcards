import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { customDeckCardCount } from "../../decks";

export type CustomDeckListItem = {
  deck: CustomDeck;
  count: number;
};

export function createCustomDeckListItems(decks: CustomDeck[], cards: Card[], deckMemberships: Record<string, string[]>): CustomDeckListItem[] {
  return decks.map((deck) => ({
    deck,
    count: customDeckCardCount(deck, cards, deckMemberships)
  }));
}
