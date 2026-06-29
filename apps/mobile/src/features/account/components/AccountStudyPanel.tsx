import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import { AccountBadges } from "./AccountBadges";
import { AccountStat } from "./AccountStat";

export function AccountStudyPanel({ summary, accountEmail }: { summary: AccountStudySummary; accountEmail: string | null }) {
  const progress = summary.deckTotal ? summary.masteredCount / summary.deckTotal : 0;

  return (
    <View style={styles.panel}>
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Č</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>{accountEmail ? "Aktivní Student" : "Guest Student"}</Text>
          <Text style={styles.profileMeta}>{summary.studiedCount} studied · {summary.customCount} custom · {summary.savedCount} starred</Text>
        </View>
        <Text style={styles.rankPill}>{summary.examLevel} NOVICE</Text>
      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.sectionTitle}>Learning Progress</Text>
        <Text style={styles.sectionMeta}>{summary.masteredCount} mastered</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(3, Math.min(100, progress * 100))}%` }]} />
      </View>
      <View style={styles.statsRow}>
        <AccountStat count={summary.deckTotal} label="Total" color={colors.bohemianBlue} />
        <AccountStat count={summary.masteredCount} label="Mastered" color={colors.success} />
        <AccountStat count={summary.learningCount} label="Learning" color={colors.bohemianGold} />
        <AccountStat count={summary.dueCount} label="Due" color={colors.bohemianRed} />
      </View>

      <AccountBadges summary={summary} />
      {!accountEmail && <Text style={styles.muted}>Progress is saved on this device · {summary.syncStatus}</Text>}
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
