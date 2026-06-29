import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";
import type { FriendRequest, FriendStreak } from "../../../sync";
import { FriendPanel } from "./FriendPanel";

type Props = {
  accountEmail: string;
  busy: boolean;
  friendCode: string;
  myFriendCode: string | null;
  friendRequests: FriendRequest[];
  friends: FriendStreak[];
  message: string;
  onChangeFriendCode: (value: string) => void;
  onSendFriendRequest: () => void;
  onRespondToFriendRequest: (requestId: string, accepted: boolean) => void;
  onSignOut: () => void;
};

export function SignedInAccount({ accountEmail, busy, friendCode, myFriendCode, friendRequests, friends, message, onChangeFriendCode, onSendFriendRequest, onRespondToFriendRequest, onSignOut }: Props) {
  return (
    <>
      <Text style={styles.rowTitle}>{accountEmail}</Text>
      <Text style={styles.muted}>Your offline reviews, custom words, corrections, settings, and starred words are queued for this account.</Text>
      <FriendPanel
        friendCode={friendCode}
        myFriendCode={myFriendCode}
        friendRequests={friendRequests}
        friends={friends}
        onChangeFriendCode={onChangeFriendCode}
        onSendFriendRequest={onSendFriendRequest}
        onRespondToFriendRequest={onRespondToFriendRequest}
      />
      {Boolean(message) && <Text style={styles.formError}>{message}</Text>}
      <Pressable disabled={busy} style={[styles.dangerButton, busy && styles.disabledButton]} onPress={onSignOut}><Text style={styles.dangerButtonText}>Sign out</Text></Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  rowTitle: { color: colors.textStrong, fontWeight: typography.weightSemibold, fontSize: typography.bodyLarge },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm },
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold },
  dangerButton: { alignItems: "center", backgroundColor: colors.dangerStrong, borderRadius: radius.md, padding: spacing.xlPlus },
  dangerButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  disabledButton: { opacity: 0.45 }
});
