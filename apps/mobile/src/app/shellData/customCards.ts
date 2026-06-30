import type { Card } from "@czech-flashcards/shared";

export function getCustomCards(cards: Card[]) {
  return cards.filter((card) => card.source === "custom");
}
