import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

export const accountTabSwitcherStyles = StyleSheet.create({
  shell: { flexDirection: "row", gap: spacing.sm, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, padding: spacing.xs },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  activeTab: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border },
  tabText: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  activeTabText: { color: colors.textStrong }
});
