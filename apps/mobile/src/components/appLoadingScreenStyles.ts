import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../theme/design";

export const appLoadingScreenStyles = StyleSheet.create({
  shell: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.page
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.card,
    borderWidth: spacing.hairline,
    gap: spacing.card,
    maxWidth: size.authPanelMaxWidth,
    padding: spacing.hero,
    width: "100%"
  },
  mark: { alignItems: "center", backgroundColor: colors.surfaceMuted, borderRadius: radius.lg, height: size.quizResultIcon, justifyContent: "center", width: size.quizResultIcon },
  copy: { alignItems: "center", gap: spacing.lg },
  title: {
    color: colors.textStrong,
    fontSize: typography.screenTitle,
    fontWeight: typography.weightBold,
    lineHeight: typography.heroLine,
    textAlign: "center"
  },
  muted: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: typography.bodyLine,
    textAlign: "center"
  }
});
