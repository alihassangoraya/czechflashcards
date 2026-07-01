import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = { title: string; reviewed: number; goal: number; status: string; streakText: string; nextAction: string };

export function ProgressHeroSummary({ title, reviewed, goal, status, streakText, nextAction }: Props) {
  const ratio = goal ? Math.min(1, reviewed / goal) : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.value}>{reviewed}/{goal}</Text>
        <Text style={styles.badge}>{status}</Text>
      </View>
      <View style={styles.track}><View style={[styles.fill, { width: `${Math.max(4, ratio * 100)}%` }]} /></View>
      <Text style={styles.next}>{nextAction}</Text>
      <Text style={styles.meta}>{streakText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, backgroundColor: colors.surfaceWarm, borderWidth: spacing.hairline, borderColor: colors.border, padding: spacing.card, gap: spacing.md },
  eyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.md },
  value: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightSemibold },
  badge: { color: colors.textStrong, backgroundColor: colors.primarySoft, borderRadius: radius.lg, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  track: { height: spacing.lg, borderRadius: radius.lg, backgroundColor: colors.progressTrack, overflow: "hidden" },
  fill: { height: "100%", borderRadius: radius.lg, backgroundColor: colors.primary },
  next: { color: colors.textBody, fontSize: typography.bodyLarge, fontWeight: typography.weightMedium },
  meta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
