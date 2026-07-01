import { urStudyDetailsTranslations } from "./study/details";
import { urStudyFlashcardTranslations } from "./study/flashcards";
import { urStudyGrammarTranslations } from "./study/grammar";
import { urStudyTutorTranslations } from "./study/tutor";

export const urStudyTranslations = {
  ...urStudyFlashcardTranslations,
  ...urStudyDetailsTranslations,
  ...urStudyGrammarTranslations,
  ...urStudyTutorTranslations
} as const;
