import { useState } from "react";
import { applyReviewGrade, formatInterval, type Card, type ReviewGrade, type ReviewState } from "@czech-flashcards/shared";
import { getReviewState, saveReviewResult, undoReviewResult, type AppDatabase, type StudySettings } from "../database";
import { useStudyAnimations } from "../features/study/useStudyAnimations";
import type { UndoReview } from "./appTypes";
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
    if (!queue.current) return "";
    const state = states[queue.current.id] || { cardId: queue.current.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
    const now = Date.now();
    const next = applyReviewGrade(state, grade, now);
    return formatInterval(next.event.nextDueAt - now);
  }

  async function grade(result: ReviewGrade) {
    if (!db || !settings || !queue.current || grading) return;
    const reviewedCard = queue.current;
    setGrading(true);
    try {
      const before = await getReviewState(db, reviewedCard.id);
      const next = applyReviewGrade(before, result, Date.now());
      const previousRelearningQueue = queue.snapshotRelearningQueue();
      await saveReviewResult(db, next.state, next.event, settings.dailyGoal);
      queue.recordReviewedCard(reviewedCard.id, result);
      setLastReview({ card: reviewedCard, previousState: before, event: next.event, previousRelearningQueue });
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
      await undoReviewResult(db, lastReview.previousState, lastReview.event, settings.dailyGoal);
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
