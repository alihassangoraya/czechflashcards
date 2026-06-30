import type { AccountPanelProps } from "../../../features/account";

export type PanelAccountHandlers = {
  onAuthenticate: AccountPanelProps["onAuthenticate"];
  onSignOut: AccountPanelProps["onSignOut"];
};
