import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { DailyProgressLog } from "../../../database";
import type { StudyAnimations } from "../../study/studyTypes/studyAnimationTypes";

export type MainStudyDataProps = {
  current: Card | null;
  revealed: boolean;
  grading: boolean;
  lastReviewCard: Card | null;
  sessionReviews: number;
  sessionTarget: number;
  reviewedToday: number;
  dailyGoal: number;
  sessionProgress: number;
  dailyProgressLog: DailyProgressLog;
  studyAnimations: StudyAnimations;
  reviewInterval: (grade: ReviewGrade) => string;
};
