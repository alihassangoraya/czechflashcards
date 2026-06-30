import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";
import { AccountStudyPanel } from "./AccountStudyPanel";
import { SignedInAccount } from "./SignedInAccount";

type Props = {
  account: AccountPanelState;
  accountEmail: string;
  busy: boolean;
  studySummary: AccountStudySummary;
};

export function SignedInAccountContent({ account, accountEmail, busy, studySummary }: Props) {
  return (
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
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus }
});
