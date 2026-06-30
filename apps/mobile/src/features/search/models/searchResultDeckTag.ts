import type { Card } from "@czech-flashcards/shared";

export function searchResultDeckTag(card: Card) {
  return card.tags.find((tag) => tag !== card.level && tag !== `${card.level}-focus`) || card.tags[0] || "deck";
}
