import { StyleSheet } from "react-native";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";

export const quizExitConfirmModalStyles = StyleSheet.create({
  exitOverlay: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.modalOverlay, padding: spacing.page },
  exitDialog: { width: "100%", maxWidth: size.modalMaxWidth, gap: spacing.xlPlus, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  exitTitle: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold, textAlign: "center" },
  exitCopy: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, lineHeight: typography.screenTitle, textAlign: "center" },
  exitActions: { flexDirection: "row", gap: spacing.lg },
  exitSecondary: { flex: 1, minHeight: size.touchTarget, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  exitPrimary: { flex: 1, minHeight: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.danger },
  exitSecondaryText: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  exitPrimaryText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
