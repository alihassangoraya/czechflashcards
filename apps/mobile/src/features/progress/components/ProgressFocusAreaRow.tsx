import React from "react";
import { StyleSheet, Text, View, type DimensionValue } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";
import type { ProgressFocusArea } from "../types/progressTypes";

type Props = { area: ProgressFocusArea; detail: string };

export function ProgressFocusAreaRow({ area, detail }: Props) {
  const width = `${Math.max(5, area.percent * 100)}%` as DimensionValue;
  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <Text style={styles.name}>{area.label}</Text>
        <Text style={styles.meta}>{Math.round(area.percent * 100)}%</Text>
      </View>
      <View style={styles.track}><View style={[styles.fill, { width }]} /></View>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.md },
  name: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  meta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  track: { height: spacing.lg, borderRadius: radius.lg, backgroundColor: colors.progressTrack, overflow: "hidden" },
  fill: { height: "100%", borderRadius: radius.lg, backgroundColor: colors.success },
  detail: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
