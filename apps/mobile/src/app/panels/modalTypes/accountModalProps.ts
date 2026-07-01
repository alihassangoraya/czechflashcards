import type { AppPanelProps } from "../panelTypes/index";

export type AccountModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "supabase"
  | "accountEmail"
  | "accountStudySummary"
  | "authBusy"
  | "onSetPanel"
  | "onAuthenticate"
  | "onAuthenticateProvider"
  | "onSignOut"
>;
