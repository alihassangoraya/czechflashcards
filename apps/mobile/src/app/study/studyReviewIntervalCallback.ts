import type { ReviewGrade } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import type { StudyQueue } from "../studyQueue/useStudyQueue";
import { formatReviewInterval } from "../studySession/reviewInterval";

export function createStudyReviewInterval(queue: StudyQueue, states: ReviewStates) {
  return function reviewInterval(grade: ReviewGrade): string {
    return formatReviewInterval(queue.current, states, grade);
  };
}
