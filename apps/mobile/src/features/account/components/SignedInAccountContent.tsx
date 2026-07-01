import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";
import { AccountFriendsTabContent } from "./AccountFriendsTabContent";
import { AccountSyncTabContent } from "./AccountSyncTabContent";
import { AccountTabSwitcher } from "./AccountTabSwitcher";
import type { AccountTabId } from "./accountTabs";
import type { SignedInAccountContentProps } from "./signedInAccountTypes";

export function SignedInAccountContent({ account, accountEmail, busy, syncStatus, onSyncNow }: SignedInAccountContentProps & { account: AccountPanelState }) {
  const [activeTab, setActiveTab] = useState<AccountTabId>("sync");

  return (
    <View style={styles.form}>
      <AccountTabSwitcher activeTab={activeTab} onChangeTab={setActiveTab} />
      {activeTab === "sync" ? (
        <AccountSyncTabContent account={account} accountEmail={accountEmail} busy={busy} syncStatus={syncStatus} onSyncNow={onSyncNow} />
      ) : (
        <AccountFriendsTabContent account={account} />
      )}
      {Boolean(account.message) && <Text style={styles.formError}>{account.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold }
});
