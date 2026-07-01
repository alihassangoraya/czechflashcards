import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const authScreenStyles = StyleSheet.create({
  screen: { flexGrow: 1, alignItems: "center", paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom, paddingTop: spacing.xl },
  formPanel: { width: "100%", maxWidth: size.authPanelMaxWidth, gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  heading: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightBold },
  copy: { color: colors.textMuted, fontSize: typography.body, lineHeight: typography.bodyLarge }
});
