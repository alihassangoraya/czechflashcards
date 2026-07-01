import React from "react";
import { View } from "react-native";
import type { AccountPanelProps } from "../types/accountPanelTypes";
import { AccountLocalSummary } from "../components/AccountLocalSummary";
import { OfflineAccountPanel } from "../components/OfflineAccountPanel";
import { SignedInAccountContent } from "../components/SignedInAccountContent";
import { SignedOutAccountContent } from "../components/SignedOutAccountContent";
import { useAccountPanel } from "../hooks/useAccountPanel";
import { accountPanelStyles as styles } from "./accountPanelStyles";

export function AccountPanel(props: AccountPanelProps) {
  const { configured, supabase, accountEmail, busy, onAuthenticate, onAuthenticateProvider, onSignOut } = props;
  const account = useAccountPanel({ accountEmail, supabase, showToast: props.showToast, onAuthenticate, onAuthenticateProvider, onSignOut });

  return (
    <View style={styles.stack}>
      <AccountLocalSummary {...props} />
      {!configured ? <OfflineAccountPanel /> : accountEmail ? <SignedInAccountContent account={account} accountEmail={accountEmail} busy={busy} syncStatus={props.syncStatus} onSyncNow={props.onSyncNow} /> : <SignedOutAccountContent account={account} busy={busy} />}
    </View>
  );
}
