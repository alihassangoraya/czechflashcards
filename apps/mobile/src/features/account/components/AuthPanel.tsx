import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, size, spacing } from "../../../theme/design";
import { AccountAuthForm } from "./AccountAuthForm";
import { AuthPanelIntro } from "./AuthPanelIntro";
import type { AuthPanelProps } from "./authPanelTypes";

export function AuthPanel({ busy, configured, displayName, email, isRegister, message, mode, password, onChangeDisplayName, onChangeEmail, onChangePassword, onSwitchMode, onProviderSubmit, onSubmit }: AuthPanelProps) {
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
        onProviderSubmit={onProviderSubmit}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { width: "100%", maxWidth: size.authPanelMaxWidth, gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.panel }
});
