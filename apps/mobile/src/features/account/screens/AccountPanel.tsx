import React from "react";
import { StyleSheet, View } from "react-native";
import { createSupabaseClient, type AuthMode } from "../../../sync";
import { spacing } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import { AccountAuthForm } from "../components/AccountAuthForm";
import { AccountStudyPanel } from "../components/AccountStudyPanel";
import { OfflineAccountPanel } from "../components/OfflineAccountPanel";
import { SignedInAccount } from "../components/SignedInAccount";
import { useAccountPanel } from "../useAccountPanel";

export type { AccountStudySummary } from "../accountTypes";

export function AccountPanel({ configured, supabase, accountEmail, studySummary, busy, onAuthenticate, onSignOut }: {
  configured: boolean;
  supabase: ReturnType<typeof createSupabaseClient>;
  accountEmail: string | null;
  studySummary: AccountStudySummary;
  busy: boolean;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
}) {
  const account = useAccountPanel({ accountEmail, supabase, onAuthenticate, onSignOut });
  if (!configured) return <OfflineAccountPanel studySummary={studySummary} accountEmail={accountEmail} />;
  if (accountEmail) return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <SignedInAccount
        accountEmail={accountEmail}
        busy={busy}
        friendCode={account.friendCode}
        myFriendCode={account.myFriendCode}
        friendRequests={account.friendRequests}
        friends={account.friends}
        message={account.message}
        onChangeFriendCode={account.setFriendCode}
        onSendFriendRequest={() => void account.sendFriend()}
        onRespondToFriendRequest={(requestId, accepted) => void account.respondToRequest(requestId, accepted)}
        onSignOut={() => void account.signOut()}
      />
    </View>
  );
  return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <AccountAuthForm
        busy={busy}
        displayName={account.displayName}
        email={account.email}
        password={account.password}
        message={account.message}
        onChangeDisplayName={account.setDisplayName}
        onChangeEmail={account.setEmail}
        onChangePassword={account.setPassword}
        onSubmit={(mode) => void account.submit(mode)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus }
});
