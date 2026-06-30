import type { Card, CardLevel, MeaningLanguage } from "./types";

export function isCardForExam(card: Card, examLevel: CardLevel): boolean {
  if (examLevel === "b1") return true;
  if (card.tags.includes("custom")) return true;
  if (String(card.id || "").startsWith("import-")) return true;
  return card.level === "a2";
}

export function filterDeck(cards: Card[], examLevel: CardLevel, deckFilter: string, savedCardIds: ReadonlySet<string> = new Set()): Card[] {
  if (deckFilter === "saved") return cards.filter((card) => savedCardIds.has(card.id));
  if (deckFilter === "a2-focus") return cards.filter((card) => card.tags.includes("a2-focus"));
  if (deckFilter === "b1-focus") return cards.filter((card) => card.tags.includes("b1-focus"));
  const levelDeck = cards.filter((card) => isCardForExam(card, examLevel));
  if (deckFilter === "all") return levelDeck;
  if (deckFilter === "core") return levelDeck.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms"));
  return levelDeck.filter((card) => card.tags.includes(deckFilter));
}

export function selectedMeaning(card: Card, language: MeaningLanguage): string {
  return language === "ur" ? card.ur : card.hi;
}
