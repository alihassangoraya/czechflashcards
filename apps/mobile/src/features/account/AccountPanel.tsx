import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  getFriendCode,
  loadFriendActivity,
  respondToFriendRequest,
  sendFriendRequest,
  type FriendRequest,
  type FriendStreak
} from "../../sync";
import { createSupabaseClient } from "../../sync";
import { colors, spacing, typography } from "../../theme/design";
import type { AccountStudySummary } from "./accountTypes";
import { AccountAuthForm } from "./components/AccountAuthForm";
import { AccountStudyPanel } from "./components/AccountStudyPanel";
import { SignedInAccount } from "./components/SignedInAccount";

export type { AccountStudySummary } from "./accountTypes";

export function AccountPanel({ configured, supabase, accountEmail, studySummary, busy, onAuthenticate, onSignOut }: {
  configured: boolean;
  supabase: ReturnType<typeof createSupabaseClient>;
  accountEmail: string | null;
  studySummary: AccountStudySummary;
  busy: boolean;
  onAuthenticate: (mode: "sign-in" | "sign-up", email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [friendCode, setFriendCode] = useState("");
  const [myFriendCode, setMyFriendCode] = useState<string | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendStreak[]>([]);
  const [message, setMessage] = useState("");
  const submit = async (mode: "sign-in" | "sign-up") => {
    if (!email.trim() || !password) {
      setMessage("Enter your email and password.");
      return;
    }
    const error = await onAuthenticate(mode, email, password, displayName);
    setMessage(error || (mode === "sign-up" ? "Account created. Check email confirmation if your project requires it." : "Signed in and syncing this device."));
  };
  const refreshFriends = async () => {
    const activity = await loadFriendActivity(supabase);
    setFriendRequests(activity.requests);
    setFriends(activity.friends);
  };
  const sendFriend = async () => {
    setMessage((await sendFriendRequest(supabase, friendCode)) || "Friend request sent.");
    setFriendCode("");
    await refreshFriends();
  };
  const respondToRequest = async (requestId: string, accepted: boolean) => {
    setMessage((await respondToFriendRequest(supabase, requestId, accepted)) || (accepted ? "Friend added." : "Request declined."));
    await refreshFriends();
  };
  useEffect(() => {
    if (!accountEmail) return;
    void getFriendCode(supabase).then(setMyFriendCode);
    void refreshFriends();
  }, [accountEmail, supabase]);
  if (!configured) return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <Text style={styles.muted}>This build has no Supabase URL or anonymous key. Offline study remains available.</Text>
    </View>
  );
  if (accountEmail) return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <SignedInAccount
        accountEmail={accountEmail}
        busy={busy}
        friendCode={friendCode}
        myFriendCode={myFriendCode}
        friendRequests={friendRequests}
        friends={friends}
        message={message}
        onChangeFriendCode={setFriendCode}
        onSendFriendRequest={() => void sendFriend()}
        onRespondToFriendRequest={(requestId, accepted) => void respondToRequest(requestId, accepted)}
        onSignOut={async () => setMessage((await onSignOut()) || "Signed out. Your local study data remains on this device.")}
      />
    </View>
  );
  return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <AccountAuthForm
        busy={busy}
        displayName={displayName}
        email={email}
        password={password}
        message={message}
        onChangeDisplayName={setDisplayName}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onSubmit={(mode) => void submit(mode)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
