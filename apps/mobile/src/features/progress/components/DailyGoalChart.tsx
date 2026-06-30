import React from "react";
import { StyleSheet, Text, View, type DimensionValue } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = { reviewed: number; goal: number; ratio: number };

export function DailyGoalChart({ reviewed, goal, ratio }: Props) {
  const { t } = useI18n();
  const width = `${Math.max(4, ratio * 100)}%` as DimensionValue;

  return (
    <View style={styles.card}>
      <View style={styles.row}><Text style={styles.title}>{t("progress.dailyGoal")}</Text><Text style={styles.meta}>{reviewed} / {goal}</Text></View>
      <View style={styles.track}><View style={[styles.fill, { width }]} /></View>
      <Text style={styles.detail}>{t(ratio >= 1 ? "progress.goalDone" : "progress.goalRemaining", { count: Math.max(0, goal - reviewed) })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.md },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.md },
  title: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  meta: { color: colors.primary, fontSize: typography.body, fontWeight: typography.weightSemibold },
  track: { height: spacing.smd, borderRadius: radius.lg, backgroundColor: colors.progressTrack, overflow: "hidden" },
  fill: { height: "100%", borderRadius: radius.lg, backgroundColor: colors.primary },
  detail: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
