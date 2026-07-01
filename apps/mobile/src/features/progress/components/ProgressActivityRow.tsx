import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, size, spacing, typography } from "../../../theme/design";
import type { ProgressDailyPoint } from "../types/progressTypes";

type Props = { point: ProgressDailyPoint; doneLabel: string; openLabel: string };

export function ProgressActivityRow({ point, doneLabel, openLabel }: Props) {
  const done = point.completed || point.reviewed >= point.goal;
  return (
    <View style={styles.row}>
      <MaterialIcons name={done ? "check-circle" : "schedule"} size={size.iconSmall} color={done ? colors.iconSuccess : colors.iconMuted} />
      <Text style={styles.day}>{point.label}</Text>
      <Text style={styles.count}>{point.reviewed}/{point.goal}</Text>
      <Text style={[styles.status, { color: done ? colors.success : colors.textMuted }]}>{done ? doneLabel : openLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  day: { flex: 1, color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  count: { color: colors.textBody, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  status: { minWidth: size.progressStatusMinWidth, textAlign: "right", fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
