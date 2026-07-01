import type { MainScreenProps } from "../screenTypes/index";

export type AccountRouteProps = Pick<
  MainScreenProps,
  | "syncStatus"
  | "supabase"
  | "accountEmail"
  | "authBusy"
  | "cards"
  | "customCards"
  | "dailyProgress"
  | "savedCardIds"
  | "settings"
  | "showToast"
  | "onGoBack"
  | "onSetScreen"
  | "onAuthenticate"
  | "onAuthenticateProvider"
  | "onSignOut"
  | "onSyncNow"
>;
