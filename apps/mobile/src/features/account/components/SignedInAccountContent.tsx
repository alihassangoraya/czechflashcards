import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";
import { AccountOverviewCard } from "./AccountOverviewCard";
import { SignedInAccount } from "./SignedInAccount";
import { SignedInSecurityActions } from "./SignedInSecurityActions";
import type { SignedInAccountContentProps } from "./signedInAccountTypes";

export function SignedInAccountContent({ account, accountEmail, busy, syncStatus, onSyncNow }: SignedInAccountContentProps & { account: AccountPanelState }) {
  return (
    <View style={styles.form}>
      <AccountOverviewCard accountEmail={accountEmail} syncStatus={syncStatus} onSyncNow={onSyncNow} />
      <SignedInSecurityActions account={account} busy={busy} />
      <SignedInAccount
        accountEmail={accountEmail}
        busy={busy}
        friendCode={account.friendCode}
        myFriendCode={account.myFriendCode}
        friendSetupUnavailable={account.friendSetupUnavailable}
        friendRequests={account.friendRequests}
        friends={account.friends}
        friendBusy={account.friendBusy}
        loadingFriends={account.loadingFriends}
        message={account.message}
        onChangeFriendCode={account.setFriendCode}
        onSendFriendRequest={() => void account.sendFriend()}
        onRespondToFriendRequest={(requestId, accepted) => void account.respondToRequest(requestId, accepted)}
        onSignOut={() => void account.signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus }
});
