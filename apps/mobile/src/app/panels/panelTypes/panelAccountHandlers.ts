import type { AccountPanelProps } from "../../../features/account";

export type PanelAccountHandlers = {
  onAuthenticate: AccountPanelProps["onAuthenticate"];
  onAuthenticateProvider: AccountPanelProps["onAuthenticateProvider"];
  onSignOut: AccountPanelProps["onSignOut"];
};
