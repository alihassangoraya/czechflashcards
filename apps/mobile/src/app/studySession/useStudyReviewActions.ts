import type { AppDatabase, StudySettings } from "../../database";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import { useGradeStudyAction } from "./useGradeStudyAction";
import { useReviewSessionState } from "./useReviewSessionState";
import { useUndoStudyAction } from "./useUndoStudyAction";

type Input = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  queue: StudyQueue;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export function useStudyReviewActions({ db, settings, queue, refresh }: Input) {
  const reviewState = useReviewSessionState();
  const grade = useGradeStudyAction({ db, settings, queue, refresh, reviewState });
  const undoLastReview = useUndoStudyAction({ db, settings, queue, refresh, reviewState });

  return {
    grading: reviewState.grading,
    lastReview: reviewState.lastReview,
    sessionReviews: reviewState.sessionReviews,
    setSessionReviews: reviewState.setSessionReviews,
    resetSessionReviews: reviewState.resetSessionReviews,
    grade,
    undoLastReview
  };
}
