import type { StudyAnimations } from "./studyTypes/studyAnimationTypes";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import type { StudyReviewActions } from "../studySession/useStudyReviewActions";
import { createStudyReviewInterval } from "./studyReviewIntervalCallback";
import type { StudySessionProps } from "./studySessionProps";

type Input = {
  queue: StudyQueue;
  reviews: StudyReviewActions;
  studyAnimations: StudyAnimations;
  states: StudySessionProps["states"];
};

export function buildStudySession({ queue, reviews, studyAnimations, states }: Input) {
  return {
    current: queue.current,
    revealed: queue.revealed,
    grading: reviews.grading,
    lastReview: reviews.lastReview,
    sessionReviews: reviews.sessionReviews,
    studyAnimations,
    setCurrent: queue.setCurrent,
    setRevealed: queue.setRevealed,
    setSessionReviews: reviews.setSessionReviews,
    forceCard: queue.forceCard,
    resetSessionReviews: reviews.resetSessionReviews,
    reviewInterval: createStudyReviewInterval(queue, states),
    grade: reviews.grade,
    undoLastReview: reviews.undoLastReview,
    shuffleDueCards: queue.shuffleDueCards,
    clearShuffledDueQueue: queue.clearShuffledDueQueue
  };
}
