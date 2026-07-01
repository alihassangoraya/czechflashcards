import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

export const grammarVerbGuideStyles = StyleSheet.create({
  heading: { color: colors.primaryDeep, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold, marginTop: spacing.xxs },
  copy: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLarge + spacing.mdPlus, fontWeight: typography.weightRegular },
  table: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  tableText: { color: colors.textExample, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs, fontWeight: typography.weightRegular },
  note: { gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.dangerSoft, padding: spacing.lg },
  noteTitle: { color: colors.iconDanger, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  rulesTitle: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
