import type { AppDatabase, StudySettings } from "../../database";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import type { ReviewSessionState } from "./useReviewSessionState";
import { undoStudyReview } from "./reviewWorkflow";

type Input = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  queue: StudyQueue;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  reviewState: ReviewSessionState;
};

export function useUndoStudyAction({ db, settings, queue, refresh, reviewState }: Input) {
  return async function undoLastReview(): Promise<boolean> {
    return undoStudyReview({
      db,
      settings,
      lastReview: reviewState.lastReview,
      grading: reviewState.grading,
      setGrading: reviewState.setGrading,
      onBeforeRestore: (review) => {
        queue.forceCard(review.card.id, true);
        queue.restoreRelearningQueue(review.previousRelearningQueue);
      },
      onRestored: () => {
        reviewState.decrementSessionReviews();
        reviewState.clearLastReview();
      },
      refresh
    });
  };
}
