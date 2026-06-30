import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../database";
import { useStudyAnimations } from "../features/study";
import { formatReviewInterval } from "./studySession/reviewInterval";
import { useStudyReviewActions } from "./studySession/useStudyReviewActions";
import { useStudyQueue } from "./useStudyQueue";

type Props = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  deck: Card[];
  states: Record<string, ReviewState>;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export function useStudySession({ db, settings, deck, states, refresh }: Props) {
  const queue = useStudyQueue(deck, states);
  const reviews = useStudyReviewActions({ db, settings, queue, refresh });

  const studyAnimations = useStudyAnimations({
    current: queue.current,
    revealed: queue.revealed,
    grading: reviews.grading,
    onRevealChange: queue.setRevealed,
    onSwipeGrade: (result) => { void reviews.grade(result); }
  });

  function reviewInterval(grade: ReviewGrade): string {
    return formatReviewInterval(queue.current, states, grade);
  }

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
    reviewInterval,
    grade: reviews.grade,
    undoLastReview: reviews.undoLastReview,
    shuffleDueCards: queue.shuffleDueCards,
    clearShuffledDueQueue: queue.clearShuffledDueQueue
  };
}

export type StudySession = ReturnType<typeof useStudySession>;
