import { useStudyAnimations } from "../../features/study";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import type { StudyReviewActions } from "../studySession/useStudyReviewActions";

type Input = {
  queue: StudyQueue;
  reviews: StudyReviewActions;
};

export function useStudySessionAnimations({ queue, reviews }: Input) {
  return useStudyAnimations({
    current: queue.current,
    revealed: queue.revealed,
    grading: reviews.grading,
    onRevealChange: queue.setRevealed,
    onSwipeGrade: (result) => { void reviews.grade(result); }
  });
}
