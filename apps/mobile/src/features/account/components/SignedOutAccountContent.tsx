import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";
import { AccountAuthForm } from "./AccountAuthForm";

type Props = {
  account: AccountPanelState;
  busy: boolean;
};

export function SignedOutAccountContent({ account, busy }: Props) {
  return (
    <View style={styles.form}>
      <AccountAuthForm
        busy={busy}
        displayName={account.displayName}
        email={account.email}
        password={account.password}
        message={account.message}
        onChangeDisplayName={account.setDisplayName}
        onChangeEmail={account.setEmail}
        onChangePassword={account.setPassword}
        onProviderSubmit={(provider) => void account.signInWithProvider(provider)}
        onSubmit={(mode) => void account.submit(mode)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus }
});
