import { ukStudyDetailsTranslations } from "./study/details";
import { ukStudyFlashcardTranslations } from "./study/flashcards";
import { ukStudyGrammarTranslations } from "./study/grammar";
import { ukStudyTutorTranslations } from "./study/tutor";

export const ukStudyTranslations = {
  ...ukStudyFlashcardTranslations,
  ...ukStudyDetailsTranslations,
  ...ukStudyGrammarTranslations,
  ...ukStudyTutorTranslations
} as const;
