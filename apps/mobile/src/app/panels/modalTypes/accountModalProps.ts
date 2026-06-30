import type { AppPanelProps } from "../panelTypes";

export type AccountModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "supabase"
  | "accountEmail"
  | "accountStudySummary"
  | "authBusy"
  | "onSetPanel"
  | "onAuthenticate"
  | "onSignOut"
>;
