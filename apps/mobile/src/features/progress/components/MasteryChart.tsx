import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = { mastered: number; learning: number; unseen: number };

export function MasteryChart({ mastered, learning, unseen }: Props) {
  const { t } = useI18n();
  const total = Math.max(1, mastered + learning + unseen);
  const segments = [
    { key: "mastered", value: mastered, color: colors.success, label: t("progress.mastered") },
    { key: "learning", value: learning, color: colors.primary, label: t("progress.learning") },
    { key: "unseen", value: unseen, color: colors.progressTrackStrong, label: t("progress.unseen") }
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t("progress.masteryDistribution")}</Text>
      <View style={styles.track}>{segments.map((item) => <View key={item.key} style={{ flex: item.value / total, backgroundColor: item.color }} />)}</View>
      {segments.map((item) => <Text key={item.key} style={styles.legend}>{item.label}: {item.value}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.md },
  title: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  track: { height: spacing.lg, flexDirection: "row", borderRadius: radius.lg, overflow: "hidden", backgroundColor: colors.surfaceMuted },
  legend: { color: colors.textBody, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
