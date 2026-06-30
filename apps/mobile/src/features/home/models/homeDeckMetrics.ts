import type { Card } from "@czech-flashcards/shared";

export function countForDeck(deckId: string, cards: Card[], savedCount: number, customCount: number): number {
  if (deckId === "saved") return savedCount;
  if (deckId === "all") return cards.length;
  if (deckId === "core") return cards.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms")).length;
  if (deckId === "custom") return customCount;
  return cards.filter((card) => card.tags.includes(deckId)).length;
}
