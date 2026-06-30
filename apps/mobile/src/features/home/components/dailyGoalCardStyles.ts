import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const dailyGoalCardStyles = StyleSheet.create({
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.lgPlus },
  todayCard: { flexDirection: "row", alignItems: "center", gap: spacing.xl, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  todayIcon: { width: size.dailyGoalIcon, height: size.dailyGoalIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.lg, backgroundColor: colors.goldSoft },
  todayCopy: { flex: 1, gap: spacing.smd },
  todayTitle: { color: colors.charcoalText, fontSize: typography.bodyLarge, fontWeight: typography.weightBold },
  todayCount: { color: colors.bohemianGold, fontSize: typography.categoryTitle, fontWeight: typography.weightSemibold },
  todayMeta: { color: colors.mutedSlate, fontSize: typography.bodySmall, fontWeight: typography.weightRegular }
});
