import type { Card } from "@czech-flashcards/shared";

const deckLabels: Record<string, string> = {
  "a2-focus": "A2 Focus",
  "b1-focus": "B1 Focus",
  saved: "My list",
  core: "Core words",
  all: "All cards"
};

export function labelForDeck(deckFilter: string): string {
  return deckLabels[deckFilter] || deckFilter;
}

export function countForDeck(deckId: string, cards: Card[], savedCount: number, customCount: number): number {
  if (deckId === "saved") return savedCount;
  if (deckId === "all") return cards.length;
  if (deckId === "core") return cards.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms")).length;
  if (deckId === "custom") return customCount;
  return cards.filter((card) => card.tags.includes(deckId)).length;
}
