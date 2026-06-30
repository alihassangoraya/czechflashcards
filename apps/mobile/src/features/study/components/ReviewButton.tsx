import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { ReviewButtonProps } from "./reviewButtonTypes";

export function ReviewButton({ disabled, style, label, interval, onPress }: ReviewButtonProps) {
  return (
    <Pressable disabled={disabled} style={[styles.button, style, disabled && styles.disabled]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.interval}>{interval}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, minHeight: size.reviewButton, alignItems: "center", justifyContent: "center", gap: spacing.xxs, borderRadius: radius.xl, paddingHorizontal: spacing.sm },
  text: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightBold },
  interval: { color: colors.onPrimaryMuted, fontSize: typography.micro, fontWeight: typography.weightMedium },
  disabled: { opacity: 0.45 }
});
