import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const customReminderTimeInputStyles = StyleSheet.create({
  customRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg },
  input: { minWidth: size.timeInputMinWidth, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold, paddingVertical: spacing.smd },
  hint: { flex: 1, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
