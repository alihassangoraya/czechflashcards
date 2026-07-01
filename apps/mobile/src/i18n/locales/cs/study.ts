import { csStudyDetailsTranslations } from "./study/details";
import { csStudyFlashcardTranslations } from "./study/flashcards";
import { csStudyGrammarTranslations } from "./study/grammar";
import { csStudyTutorTranslations } from "./study/tutor";

export const csStudyTranslations = {
  ...csStudyFlashcardTranslations,
  ...csStudyDetailsTranslations,
  ...csStudyGrammarTranslations,
  ...csStudyTutorTranslations
} as const;
