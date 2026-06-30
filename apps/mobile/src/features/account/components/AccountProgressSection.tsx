import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import { AccountStat } from "./AccountStat";

type Props = {
  summary: AccountStudySummary;
};

export function AccountProgressSection({ summary }: Props) {
  const { t } = useI18n();
  const progress = summary.deckTotal ? summary.masteredCount / summary.deckTotal : 0;

  return (
    <>
      <View style={styles.progressHeader}>
        <Text style={styles.sectionTitle}>{t("account.learningProgress")}</Text>
        <Text style={styles.sectionMeta}>{t("account.mastered", { count: summary.masteredCount })}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(3, Math.min(100, progress * 100))}%` }]} />
      </View>
      <View style={styles.statsRow}>
        <AccountStat count={summary.deckTotal} label={t("account.total")} color={colors.bohemianBlue} />
        <AccountStat count={summary.masteredCount} label={t("account.masteredLabel")} color={colors.success} />
        <AccountStat count={summary.learningCount} label={t("account.learning")} color={colors.bohemianGold} />
        <AccountStat count={summary.dueCount} label={t("account.due")} color={colors.bohemianRed} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  sectionTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  sectionMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  progressTrack: { height: spacing.lg, overflow: "hidden", borderRadius: spacing.sm, backgroundColor: colors.progressTrack },
  progressFill: { height: "100%", borderRadius: spacing.sm, backgroundColor: colors.success },
  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md }
});
