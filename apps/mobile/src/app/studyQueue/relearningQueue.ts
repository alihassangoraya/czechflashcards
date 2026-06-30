import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import { advanceRelearningQueue, scheduleRelearningEntry, takeRelearningCardFromQueue } from "./relearningScheduling";
import type { RelearningEntry } from "./relearningTypes";
import { RELEARNING_MAX_CARDS, RELEARNING_MIN_CARDS } from "./studyQueueConstants";

export function recordRelearningReview(queue: RelearningEntry[], cardId: string, grade: ReviewGrade): RelearningEntry[] {
  const advanced = advanceRelearningQueue(queue, cardId);
  return grade === "again" ? scheduleRelearningEntry(advanced, cardId, RELEARNING_MIN_CARDS, RELEARNING_MAX_CARDS) : advanced;
}

export function snapshotRelearningQueue(queue: RelearningEntry[]) {
  return queue.map((entry) => ({ ...entry }));
}

export function restoreRelearningQueue(queue: RelearningEntry[]) {
  return queue.map((entry) => ({ ...entry }));
}

export function takeNextRelearningCard(queue: RelearningEntry[], deck: Card[], recentCardIds: string[], allowEarlyReturn = false) {
  return takeRelearningCardFromQueue(queue, deck, recentCardIds, allowEarlyReturn);
}
