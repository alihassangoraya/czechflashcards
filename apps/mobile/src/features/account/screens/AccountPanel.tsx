import React from "react";
import type { AccountPanelProps } from "../types/accountPanelTypes";
import { OfflineAccountPanel } from "../components/OfflineAccountPanel";
import { SignedInAccountContent } from "../components/SignedInAccountContent";
import { SignedOutAccountContent } from "../components/SignedOutAccountContent";
import { useAccountPanel } from "../hooks/useAccountPanel";

export function AccountPanel(props: AccountPanelProps) {
  const { configured, supabase, accountEmail, busy, onAuthenticate, onAuthenticateProvider, onSignOut } = props;
  const account = useAccountPanel({ accountEmail, supabase, showToast: props.showToast, onAuthenticate, onAuthenticateProvider, onSignOut });
  if (!configured) return <OfflineAccountPanel />;
  if (accountEmail) return <SignedInAccountContent account={account} accountEmail={accountEmail} busy={busy} syncStatus={props.syncStatus} onSyncNow={props.onSyncNow} />;
  return <SignedOutAccountContent account={account} busy={busy} />;
}
