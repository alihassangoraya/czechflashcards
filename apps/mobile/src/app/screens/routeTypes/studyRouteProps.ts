import type { MainScreenProps } from "../screenTypes";

export type StudyRouteProps = Pick<
  MainScreenProps,
  | "current"
  | "settings"
  | "savedCardIds"
  | "revealed"
  | "grading"
  | "lastReviewCard"
  | "sessionReviews"
  | "sessionTarget"
  | "reviewedToday"
  | "dailyGoal"
  | "sessionProgress"
  | "studyAnimations"
  | "reviewInterval"
  | "onSetScreen"
  | "onSetPanel"
  | "onToggleSaved"
  | "onSetDeckManagementCard"
  | "onOpenCardEditor"
  | "onUndoLastReview"
  | "onGrade"
>;
