import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { AuthProvider } from "../../../sync";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  busy: boolean;
  label: string;
  mark: string;
  provider: AuthProvider;
  onPress: (provider: AuthProvider) => void;
};

export function AuthProviderButton({ busy, label, mark, provider, onPress }: Props) {
  return (
    <Pressable disabled={busy} style={[styles.button, busy && styles.disabled]} onPress={() => onPress(provider)}>
      <Text style={styles.mark}>{mark}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, minWidth: size.authProviderMinWidth, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.md },
  mark: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  label: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.45 }
});
