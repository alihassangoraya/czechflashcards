import React from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { AccountSignOutButton } from "./AccountSignOutButton";
import { FriendPanel } from "./FriendPanel";
import type { SignedInAccountProps } from "./signedInAccountTypes";

export function SignedInAccount({ accountEmail, busy, friendCode, myFriendCode, friendRequests, friends, message, onChangeFriendCode, onSendFriendRequest, onRespondToFriendRequest, onSignOut }: SignedInAccountProps) {
  const { t } = useI18n();

  return (
    <>
      <Text style={styles.rowTitle}>{accountEmail}</Text>
      <Text style={styles.muted}>{t("account.queueCopy")}</Text>
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
      <AccountSignOutButton busy={busy} label={t("account.signOut")} onSignOut={onSignOut} />
    </>
  );
}

const styles = StyleSheet.create({
  rowTitle: { color: colors.textStrong, fontWeight: typography.weightSemibold, fontSize: typography.bodyLarge },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm },
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold }
});
