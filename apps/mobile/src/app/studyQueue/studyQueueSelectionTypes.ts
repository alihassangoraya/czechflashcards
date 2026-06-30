import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import type { RelearningEntry } from "./relearningTypes";

export type StudyQueueSelectionInput = {
  deck: Card[];
  states: ReviewStates;
  forcedCardId: string | null;
  shuffledDueQueue: string[];
  relearningQueue: RelearningEntry[];
  recentCardIds: string[];
  now: number;
};

export type StudyQueueSelectionResult = {
  nextCard: Card | null;
  shuffledDueQueue: string[];
  relearningQueue: RelearningEntry[];
  forced: Card | null;
};
