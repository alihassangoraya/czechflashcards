import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import type { useAccountPanel } from "../useAccountPanel";
import { AccountAuthForm } from "./AccountAuthForm";
import { AccountStudyPanel } from "./AccountStudyPanel";

type AccountPanelState = ReturnType<typeof useAccountPanel>;

type Props = {
  account: AccountPanelState;
  busy: boolean;
  studySummary: AccountStudySummary;
};

export function SignedOutAccountContent({ account, busy, studySummary }: Props) {
  return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={null} />
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
