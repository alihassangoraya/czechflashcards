import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";
import type { AuthMode } from "../accountAuth";
import { AccountAuthForm } from "./AccountAuthForm";
import { AuthPanelIntro } from "./AuthPanelIntro";

type Props = {
  busy: boolean;
  configured: boolean;
  displayName: string;
  email: string;
  isRegister: boolean;
  message: string;
  mode: AuthMode;
  password: string;
  onChangeDisplayName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSwitchMode: (mode: AuthMode) => void;
  onSubmit: (mode: AuthMode) => void;
};

export function AuthPanel({ busy, configured, displayName, email, isRegister, message, mode, password, onChangeDisplayName, onChangeEmail, onChangePassword, onSwitchMode, onSubmit }: Props) {
  return (
    <View style={styles.panel}>
      <AuthPanelIntro configured={configured} isRegister={isRegister} />
      <AccountAuthForm
        busy={busy}
        displayName={displayName}
        email={email}
        mode={mode}
        password={password}
        message={message}
        onChangeDisplayName={onChangeDisplayName}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSwitchMode={onSwitchMode}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.panel }
});
