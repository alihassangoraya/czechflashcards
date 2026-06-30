import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  busy: boolean;
  label: string;
  onSignOut: () => void;
};

export function AccountSignOutButton({ busy, label, onSignOut }: Props) {
  return (
    <Pressable disabled={busy} style={[styles.dangerButton, busy && styles.disabledButton]} onPress={onSignOut}>
      <Text style={styles.dangerButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dangerButton: { alignItems: "center", backgroundColor: colors.dangerStrong, borderRadius: radius.md, padding: spacing.xlPlus },
  dangerButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  disabledButton: { opacity: 0.45 }
});
