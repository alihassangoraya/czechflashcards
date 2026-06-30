import type { Card } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";

export function pronunciationHint(word: string) {
  return `[ ${word} ] · stress the first syllable`;
}

export function displaySelectedMeaning(card: Card, language: StudySettings["meaningLanguage"]): string {
  const meaning = selectedMeaning(card, language).trim();
  return isRealTranslation(meaning) ? meaning : "";
}

function isRealTranslation(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return Boolean(normalized) && normalized !== "hindi meaning pending" && normalized !== "اردو معنی باقی ہے";
}
