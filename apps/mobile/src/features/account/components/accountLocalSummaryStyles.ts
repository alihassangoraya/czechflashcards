import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const accountLocalSummaryStyles = StyleSheet.create({
  card: {
    gap: spacing.lg,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.xlPlus
  },
  label: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase" },
  title: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold, lineHeight: typography.cardBodyLine },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg },
  item: { flex: 1, minWidth: size.accountSummaryItemMinWidth, borderRadius: radius.sm, backgroundColor: colors.surfaceSecondary, padding: spacing.lg },
  value: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightBold },
  itemLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  meta: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
