import { useState } from "react";
import type { ReviewGrade } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../../database";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import type { UndoReview } from "./reviewTypes";
import { gradeStudyCard, undoStudyReview } from "./reviewWorkflow";

type Input = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  queue: StudyQueue;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export function useStudyReviewActions({ db, settings, queue, refresh }: Input) {
  const [lastReview, setLastReview] = useState<UndoReview | null>(null);
  const [grading, setGrading] = useState(false);
  const [sessionReviews, setSessionReviews] = useState(0);

  async function grade(result: ReviewGrade): Promise<void> {
    await gradeStudyCard({
      db,
      settings,
      card: queue.current,
      grade: result,
      grading,
      previousRelearningQueue: queue.snapshotRelearningQueue(),
      setGrading,
      onReviewed: (review, cardId, grade) => {
        queue.recordReviewedCard(cardId, grade);
        setLastReview(review);
        setSessionReviews((value) => value + 1);
      },
      refresh
    });
  }

  async function undoLastReview(): Promise<void> {
    await undoStudyReview({
      db,
      settings,
      lastReview,
      grading,
      setGrading,
      onBeforeRestore: (review) => {
        queue.forceCard(review.card.id, true);
        queue.restoreRelearningQueue(review.previousRelearningQueue);
      },
      onRestored: () => {
        setSessionReviews((value) => Math.max(0, value - 1));
        setLastReview(null);
      },
      refresh
    });
  }

  return {
    grading,
    lastReview,
    sessionReviews,
    setSessionReviews,
    resetSessionReviews: () => setSessionReviews(0),
    grade,
    undoLastReview
  };
}
