import React from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, typography } from "../../../theme/design";
import { AccountSignOutButton } from "./AccountSignOutButton";
import { FriendPanel } from "./FriendPanel";
import type { SignedInAccountProps } from "./signedInAccountTypes";

export function SignedInAccount({ busy, friendCode, myFriendCode, friendSetupUnavailable, friendRequests, friends, friendBusy, loadingFriends, message, onChangeFriendCode, onSendFriendRequest, onRespondToFriendRequest, onSignOut }: SignedInAccountProps) {
  const { t } = useI18n();

  return (
    <>
      <FriendPanel
        friendCode={friendCode}
        myFriendCode={myFriendCode}
        friendSetupUnavailable={friendSetupUnavailable}
        friendRequests={friendRequests}
        friends={friends}
        friendBusy={friendBusy}
        loadingFriends={loadingFriends}
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
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold }
});
