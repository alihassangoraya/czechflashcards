import type { MainScreenProps } from "./screenTypes";

export type HomeRouteProps = Pick<
  MainScreenProps,
  | "deck"
  | "cards"
  | "customCards"
  | "states"
  | "settings"
  | "savedCardIds"
  | "dailyProgress"
  | "accountEmail"
  | "syncStatus"
  | "onStartStudy"
  | "onSelectCategory"
  | "onSetPanel"
  | "onSetScreen"
>;

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

export type QuizRouteProps = Pick<MainScreenProps, "deck" | "onSetScreen">;

export type AuthRouteProps = Pick<
  MainScreenProps,
  "screen" | "syncStatus" | "authBusy" | "onSetScreen" | "onAuthenticate"
>;
