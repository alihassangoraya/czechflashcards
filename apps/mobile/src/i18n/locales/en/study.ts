import { enStudyDetailsTranslations } from "./study/details";
import { enStudyFlashcardTranslations } from "./study/flashcards";
import { enStudyGrammarTranslations } from "./study/grammar";
import { enStudyTutorTranslations } from "./study/tutor";

export const enStudyTranslations = {
  ...enStudyFlashcardTranslations,
  ...enStudyDetailsTranslations,
  ...enStudyGrammarTranslations,
  ...enStudyTutorTranslations
} as const;
