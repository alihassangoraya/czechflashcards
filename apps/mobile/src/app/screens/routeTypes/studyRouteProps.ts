import type { MainScreenProps } from "../screenTypes/index";

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
  | "onGoBack"
  | "onSetPanel"
  | "onToggleSaved"
  | "onSetDeckManagementCard"
  | "onOpenCardEditor"
  | "onUndoLastReview"
  | "onGrade"
>;
