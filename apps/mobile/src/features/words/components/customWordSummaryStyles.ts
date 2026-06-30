import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const customWordSummaryStyles = StyleSheet.create({
  accent: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  copy: { flex: 1, gap: spacing.xs },
  titleRow: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  word: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  deckPill: { maxWidth: size.cardHeight / 2, borderRadius: radius.card, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  deckText: { color: colors.textSoft, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  meaning: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
