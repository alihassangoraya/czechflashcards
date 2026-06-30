import { useState } from "react";
import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../database";
import { useStudyAnimations } from "../features/study";
import type { UndoReview } from "./appTypes";
import { formatReviewInterval } from "./studySession/reviewInterval";
import { restoreReview, saveGradedReview } from "./studySession/reviewPersistence";
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
  const [lastReview, setLastReview] = useState<UndoReview | null>(null);
  const [grading, setGrading] = useState(false);
  const [sessionReviews, setSessionReviews] = useState(0);

  const studyAnimations = useStudyAnimations({
    current: queue.current,
    revealed: queue.revealed,
    grading,
    onRevealChange: queue.setRevealed,
    onSwipeGrade: (result) => { void grade(result); }
  });

  function resetSessionReviews() {
    setSessionReviews(0);
  }

  function reviewInterval(grade: ReviewGrade): string {
    return formatReviewInterval(queue.current, states, grade);
  }

  async function grade(result: ReviewGrade) {
    if (!db || !settings || !queue.current || grading) return;
    const reviewedCard = queue.current;
    setGrading(true);
    try {
      const previousRelearningQueue = queue.snapshotRelearningQueue();
      const review = await saveGradedReview({ db, card: reviewedCard, grade: result, dailyGoal: settings.dailyGoal, previousRelearningQueue });
      queue.recordReviewedCard(reviewedCard.id, result);
      setLastReview(review);
      setSessionReviews((value) => value + 1);
      await refresh(db);
    } finally {
      setGrading(false);
    }
  }

  async function undoLastReview() {
    if (!db || !settings || !lastReview || grading) return;
    setGrading(true);
    try {
      queue.forceCard(lastReview.card.id, true);
      queue.restoreRelearningQueue(lastReview.previousRelearningQueue);
      await restoreReview(db, lastReview, settings.dailyGoal);
      await refresh(db);
      setSessionReviews((value) => Math.max(0, value - 1));
      setLastReview(null);
    } finally {
      setGrading(false);
    }
  }

  return {
    current: queue.current,
    revealed: queue.revealed,
    grading,
    lastReview,
    sessionReviews,
    studyAnimations,
    setCurrent: queue.setCurrent,
    setRevealed: queue.setRevealed,
    setSessionReviews,
    forceCard: queue.forceCard,
    resetSessionReviews,
    reviewInterval,
    grade,
    undoLastReview,
    shuffleDueCards: queue.shuffleDueCards,
    clearShuffledDueQueue: queue.clearShuffledDueQueue
  };
}
