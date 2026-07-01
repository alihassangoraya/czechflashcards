import { Platform, StyleSheet } from "react-native";
import { colors, size, spacing, typography } from "../theme/design";

export const screenHeaderStyles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: Platform.OS === "web" ? typography.bodyLarge : 0, paddingBottom: typography.bodyLarge },
  titleRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  rtlRow: { flexDirection: "row-reverse" },
  title: { flex: 1, color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  trailing: { flexDirection: "row", gap: spacing.lg },
  backIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" }
});
