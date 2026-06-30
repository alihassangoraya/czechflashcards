import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  busy: boolean;
  label: string;
  variant: "primary" | "secondary";
  onPress: () => void;
};

export function AccountAuthButton({ busy, label, variant, onPress }: Props) {
  const primary = variant === "primary";

  return (
    <Pressable disabled={busy} style={[primary ? styles.primaryButton : styles.secondaryAction, busy && styles.disabledButton]} onPress={onPress}>
      <Text style={primary ? styles.primaryButtonText : styles.secondaryActionText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lgPlus, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  disabledButton: { opacity: 0.45 }
});
