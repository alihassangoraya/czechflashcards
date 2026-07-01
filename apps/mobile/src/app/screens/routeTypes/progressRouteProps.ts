import type { MainScreenProps } from "../screenTypes/index";

export type ProgressRouteProps = Pick<
  MainScreenProps,
  | "cards"
  | "states"
  | "settings"
  | "dailyProgressLog"
  | "onStartStudy"
  | "onGoBack"
  | "onSetScreen"
  | "onShuffleDue"
  | "onReviewAllNow"
>;
