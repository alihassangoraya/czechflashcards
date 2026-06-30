import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import type { TranslationKey } from "../../i18n/translations";
import type { StudyQueueRefs } from "./studyQueueRefs";

export type StudyQueueActionInput = {
  deck: Card[];
  states: ReviewStates;
  current: Card | null;
  refs: StudyQueueRefs;
  translate: (key: TranslationKey) => string;
};
