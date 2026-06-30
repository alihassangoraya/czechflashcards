import type { ReviewGrade } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../../database";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import type { ReviewSessionState } from "./useReviewSessionState";
import { gradeStudyCard } from "./reviewWorkflow";

type Input = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  queue: StudyQueue;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  reviewState: ReviewSessionState;
};

export function useGradeStudyAction({ db, settings, queue, refresh, reviewState }: Input) {
  return async function grade(result: ReviewGrade): Promise<void> {
    await gradeStudyCard({
      db,
      settings,
      card: queue.current,
      grade: result,
      grading: reviewState.grading,
      previousRelearningQueue: queue.snapshotRelearningQueue(),
      setGrading: reviewState.setGrading,
      onReviewed: (review, cardId, grade) => {
        queue.recordReviewedCard(cardId, grade);
        reviewState.recordReview(review);
      },
      refresh
    });
  };
}
