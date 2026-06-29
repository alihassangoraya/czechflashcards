import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";

export const addWordDeckOptions = ["a2-focus", "b1-focus", "daily", "extended", "travel", "work", "health", "verbs", "forms", "numbers", "custom"];

export function deckLabel(value: string, decks: CustomDeck[]) {
  return decks.find((deck) => deck.id === value)?.name || ({
    "a2-focus": "A2 Focus",
    "b1-focus": "B1 Focus"
  }[value] || value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase()));
}

export function customCardDeckLabel(card: Card, decks: CustomDeck[]) {
  const customDeckIds = new Set(decks.map((deck) => deck.id));
  const tag = card.tags.find((value) => customDeckIds.has(value)) || card.tags.find((value) => value !== "custom") || "custom";
  return deckLabel(tag, decks);
}
