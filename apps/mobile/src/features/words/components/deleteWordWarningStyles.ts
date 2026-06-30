import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const deleteWordWarningStyles = StyleSheet.create({
  warning: { gap: spacing.md, borderRadius: radius.sm, backgroundColor: colors.dangerSoft, padding: spacing.lg },
  copy: { gap: spacing.xxs },
  title: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.smd },
  cancelButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.surface, paddingHorizontal: spacing.lg },
  cancelText: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  confirmButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.danger, paddingHorizontal: spacing.lg },
  confirmText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
