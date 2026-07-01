import { hiStudyDetailsTranslations } from "./study/details";
import { hiStudyFlashcardTranslations } from "./study/flashcards";
import { hiStudyGrammarTranslations } from "./study/grammar";
import { hiStudyTutorTranslations } from "./study/tutor";

export const hiStudyTranslations = {
  ...hiStudyFlashcardTranslations,
  ...hiStudyDetailsTranslations,
  ...hiStudyGrammarTranslations,
  ...hiStudyTutorTranslations
} as const;
