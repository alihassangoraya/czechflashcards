import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";

const badges = (summary: AccountStudySummary) => [
  { icon: "trending-up" as const, title: "First Step", label: "Study 1 card", unlocked: summary.studiedCount >= 1 },
  { icon: "star" as const, title: "Starred List", label: "Star 5 cards", unlocked: summary.savedCount >= 5 },
  { icon: "check-circle" as const, title: "Due Clear", label: "No due cards", unlocked: summary.deckTotal > 0 && summary.dueCount === 0 },
  { icon: "star" as const, title: "Mastery", label: "Master 10 cards", unlocked: summary.masteredCount >= 10 }
];

export function AccountBadges({ summary }: { summary: AccountStudySummary }) {
  return (
    <>
      <Text style={styles.title}>Milestones</Text>
      <View style={styles.badges}>
        {badges(summary).map((badge) => (
          <View key={badge.title} style={styles.item}>
            <View style={[styles.icon, !badge.unlocked && styles.lockedIcon]}>
              <MaterialIcons name={badge.icon} size={size.iconSmall} color={badge.unlocked ? colors.bohemianGold : colors.textMuted} />
            </View>
            <Text style={[styles.name, !badge.unlocked && styles.lockedText]} numberOfLines={1}>{badge.title}</Text>
            <Text style={styles.label} numberOfLines={2}>{badge.label}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primaryDeep, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  badges: { flexDirection: "row", gap: spacing.md },
  item: { flex: 1, alignItems: "center", gap: spacing.xxs },
  icon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.goldSoft },
  lockedIcon: { backgroundColor: colors.surfaceMuted },
  name: { color: colors.textStrong, fontSize: typography.micro, fontWeight: typography.weightSemibold, textAlign: "center" },
  label: { color: colors.textMuted, fontSize: typography.micro, lineHeight: typography.bodySmall, textAlign: "center" },
  lockedText: { color: colors.textMuted }
});
