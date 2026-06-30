import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";
import type { AccountStatProps } from "./accountStatTypes";

export function AccountStat({ count, label, color }: AccountStatProps) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.count, { color }]}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: { flex: 1, alignItems: "center", gap: spacing.xxs },
  count: { fontSize: typography.bodyLarge, fontWeight: typography.weightBold },
  label: { color: colors.textMuted, fontSize: typography.micro, fontWeight: typography.weightMedium }
});
