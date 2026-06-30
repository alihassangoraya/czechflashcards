import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

const letter = { width: size.iconLarge, height: size.iconLarge, borderRadius: radius.sm, fontSize: typography.caption, fontWeight: typography.weightBold, lineHeight: size.iconLarge, textAlign: "center" as const };

export const quizOptionStyles = StyleSheet.create({
  option: { minHeight: size.quizOptionHeight, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  optionInner: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  optionLetter: { ...letter, color: colors.textMuted, backgroundColor: colors.surfaceMuted },
  selectedOption: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  selectedLetter: { ...letter, color: colors.onPrimary, backgroundColor: colors.primary },
  correctOption: { borderColor: colors.success, backgroundColor: colors.success },
  correctLetter: { ...letter, color: colors.success, backgroundColor: colors.surface },
  wrongOption: { borderColor: colors.danger, backgroundColor: colors.danger },
  wrongLetter: { ...letter, color: colors.danger, backgroundColor: colors.surface },
  optionText: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightMedium },
  optionTextInverted: { flex: 1, color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
