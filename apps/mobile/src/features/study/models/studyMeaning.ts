import type { Card } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import type { MeaningLanguage } from "@czech-flashcards/shared";

export function pronunciationDisplay(card: Card) {
  return `[ ${card.pronunciation || card.cz} ]`;
}

export function displaySelectedMeaning(card: Card, language: MeaningLanguage): string {
  const meaning = selectedMeaning(card, language).trim();
  if (language === "en" || meaning === card.en.trim()) return "";
  return isRealTranslation(meaning) ? meaning : "";
}

function isRealTranslation(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return Boolean(normalized) && normalized !== "hindi meaning pending" && normalized !== "اردو معنی باقی ہے";
}
