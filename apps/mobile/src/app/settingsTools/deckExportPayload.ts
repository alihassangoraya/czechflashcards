import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";

export function buildDeckExportPayload(deck: Card[], settings: StudySettings) {
  return {
    exportedAt: new Date().toISOString(),
    exam: settings.examLevel,
    deck: settings.deckFilter,
    cards: deck.map((card) => ({
      id: card.id,
      level: card.level,
      cz: card.cz,
      en: card.en,
      hi: card.hi,
      ur: card.ur,
      sentence: card.sentence,
      sentenceEn: card.sentenceEn,
      pronunciation: card.pronunciation,
      synonyms: card.synonyms,
      antonyms: card.antonyms,
      grammar: card.grammar,
      googleCategory: card.googleCategory,
      tags: card.tags
    }))
  };
}
