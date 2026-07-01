import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { ProgressDailyPoint } from "../types/progressTypes";

type Props = { points: ProgressDailyPoint[]; title: string };

export function WeeklyStudyChart({ points, title }: Props) {
  const maxValue = Math.max(1, ...points.map((point) => point.reviewed));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chart}>
        {points.map((point) => (
          <View key={point.key} style={styles.column}>
            <Text style={styles.value}>{point.reviewed}</Text>
            <View style={styles.barTrack}><View style={[styles.bar, { height: `${Math.max(8, (point.reviewed / maxValue) * 100)}%` }]} /></View>
            <Text style={styles.label}>{point.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.lg },
  title: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  chart: { height: size.progressChartHeight, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: spacing.sm },
  column: { flex: 1, height: "100%", alignItems: "center", justifyContent: "flex-end", gap: spacing.sm },
  value: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  barTrack: { flex: 1, width: "100%", justifyContent: "flex-end", borderRadius: radius.lg, backgroundColor: colors.surfaceMuted, overflow: "hidden" },
  bar: { width: "100%", minHeight: size.progressBarMinHeight, borderRadius: radius.lg, backgroundColor: colors.primary },
  label: { color: colors.textBody, fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
