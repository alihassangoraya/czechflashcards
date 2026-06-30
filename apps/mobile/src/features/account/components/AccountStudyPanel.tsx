import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import { AccountBadges } from "./AccountBadges";
import { AccountStat } from "./AccountStat";

export function AccountStudyPanel({ summary, accountEmail }: { summary: AccountStudySummary; accountEmail: string | null }) {
  const { t } = useI18n();
  const progress = summary.deckTotal ? summary.masteredCount / summary.deckTotal : 0;

  return (
    <View style={styles.panel}>
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Č</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>{accountEmail ? t("account.activeStudent") : t("account.guestStudent")}</Text>
          <Text style={styles.profileMeta}>{t("account.profileMeta", { studied: summary.studiedCount, custom: summary.customCount, starred: summary.savedCount })}</Text>
        </View>
        <Text style={styles.rankPill}>{t("account.rank", { level: summary.examLevel })}</Text>
      </View>

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

      <AccountBadges summary={summary} />
      {!accountEmail && <Text style={styles.muted}>{t("account.localProgress", { status: summary.syncStatus })}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  profileRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  avatar: { width: size.headerAction, height: size.headerAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft },
  avatarText: { color: colors.primaryDeep, fontSize: size.icon, fontWeight: typography.weightSemibold },
  profileCopy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  profileName: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  profileMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  rankPill: { overflow: "hidden", borderRadius: radius.md, backgroundColor: colors.mintSoft, color: colors.success, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, fontSize: typography.micro, fontWeight: typography.weightSemibold },
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  sectionTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  sectionMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  progressTrack: { height: spacing.lg, overflow: "hidden", borderRadius: spacing.sm, backgroundColor: colors.progressTrack },
  progressFill: { height: "100%", borderRadius: spacing.sm, backgroundColor: colors.success },
  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
