import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import type { I18nContextValue } from "../../../i18n/i18nContext";
import type { TranslationKey } from "../../../i18n/translations";

export const addWordDeckOptions = ["a2-focus", "b1-focus", "daily", "extended", "travel", "work", "health", "verbs", "forms", "numbers", "custom"];
const translatableDeckIds = new Set(addWordDeckOptions);

export function deckLabel(value: string, decks: CustomDeck[], t?: I18nContextValue["t"]) {
  const customDeck = decks.find((deck) => deck.id === value);
  if (customDeck) return customDeck.name;
  if (t && translatableDeckIds.has(value)) return t(`deck.${value}` as TranslationKey);
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

export function customCardDeckLabel(card: Card, decks: CustomDeck[], t?: I18nContextValue["t"]) {
  const customDeckIds = new Set(decks.map((deck) => deck.id));
  const tag = card.tags.find((value) => customDeckIds.has(value)) || card.tags.find((value) => value !== "custom") || "custom";
  return deckLabel(tag, decks, t);
}
