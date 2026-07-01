import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const friendPanelStyles = StyleSheet.create({
  panel: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus },
  fieldLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase", marginTop: spacing.sm },
  friendCode: { color: colors.textDeep, fontSize: size.iconMedium, fontWeight: typography.weightBold },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  sectionTitle: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold, textTransform: "uppercase", marginTop: spacing.md },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm },
  disabled: { opacity: 0.52 },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lgPlus, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold }
});
