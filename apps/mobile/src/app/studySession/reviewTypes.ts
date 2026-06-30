import type { Card, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import type { RelearningEntry } from "../studyQueue/relearningTypes";

export type UndoReview = {
  card: Card;
  previousState: ReviewState;
  event: ReviewEvent;
  previousRelearningQueue: RelearningEntry[];
};
