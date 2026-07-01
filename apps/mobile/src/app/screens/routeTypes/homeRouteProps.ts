import type { MainScreenProps } from "../screenTypes/index";

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
  | "accountName"
  | "syncStatus"
  | "onStartStudy"
  | "onSelectCategory"
  | "onSetPanel"
  | "onSetScreen"
>;
