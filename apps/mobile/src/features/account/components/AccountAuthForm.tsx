import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  busy: boolean;
  displayName: string;
  email: string;
  mode?: "sign-in" | "sign-up";
  password: string;
  message: string;
  onChangeDisplayName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSwitchMode?: (mode: "sign-in" | "sign-up") => void;
  onSubmit: (mode: "sign-in" | "sign-up") => void;
};

export function AccountAuthForm({ busy, displayName, email, mode, password, message, onChangeDisplayName, onChangeEmail, onChangePassword, onSwitchMode, onSubmit }: Props) {
  const fixedMode = Boolean(mode);
  const activeMode = mode || "sign-in";
  const isRegister = activeMode === "sign-up";

  return (
    <>
      {(isRegister || !fixedMode) && <TextInput style={styles.input} value={displayName} onChangeText={onChangeDisplayName} placeholder="Display name (for friends, optional)" placeholderTextColor={colors.textMuted} />}
      <TextInput style={styles.input} value={email} onChangeText={onChangeEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="Email" placeholderTextColor={colors.textMuted} />
      <TextInput style={styles.input} value={password} onChangeText={onChangePassword} secureTextEntry placeholder="Password" placeholderTextColor={colors.textMuted} />
      {Boolean(message) && <Text style={styles.formError}>{message}</Text>}
      {fixedMode ? (
        <>
          <Pressable disabled={busy} style={[styles.primaryButton, busy && styles.disabledButton]} onPress={() => onSubmit(activeMode)}>
            <Text style={styles.primaryButtonText}>{isRegister ? "Create account" : "Sign in"}</Text>
          </Pressable>
          <Pressable
            disabled={busy}
            style={[styles.secondaryAction, busy && styles.disabledButton]}
            onPress={() => onSwitchMode?.(isRegister ? "sign-in" : "sign-up")}
          >
            <Text style={styles.secondaryActionText}>{isRegister ? "I already have an account" : "Create a new account"}</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable disabled={busy} style={[styles.primaryButton, busy && styles.disabledButton]} onPress={() => onSubmit("sign-in")}><Text style={styles.primaryButtonText}>Sign in</Text></Pressable>
          <Pressable disabled={busy} style={[styles.secondaryAction, busy && styles.disabledButton]} onPress={() => onSubmit("sign-up")}><Text style={styles.secondaryActionText}>Create account</Text></Pressable>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold },
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lgPlus, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  disabledButton: { opacity: 0.45 }
});
