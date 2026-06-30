import React from "react";
import type { AccountPanelProps } from "../accountPanelTypes";
import { OfflineAccountPanel } from "../components/OfflineAccountPanel";
import { SignedInAccountContent } from "../components/SignedInAccountContent";
import { SignedOutAccountContent } from "../components/SignedOutAccountContent";
import { useAccountPanel } from "../hooks/useAccountPanel";

export type { AccountStudySummary } from "../accountTypes";

export function AccountPanel({ configured, supabase, accountEmail, studySummary, busy, onAuthenticate, onSignOut }: AccountPanelProps) {
  const account = useAccountPanel({ accountEmail, supabase, onAuthenticate, onSignOut });
  if (!configured) return <OfflineAccountPanel studySummary={studySummary} accountEmail={accountEmail} />;
  if (accountEmail) return <SignedInAccountContent account={account} accountEmail={accountEmail} busy={busy} studySummary={studySummary} />;
  return <SignedOutAccountContent account={account} busy={busy} studySummary={studySummary} />;
}
