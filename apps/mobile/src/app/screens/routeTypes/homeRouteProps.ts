import type { MainScreenProps } from "../screenTypes";

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
