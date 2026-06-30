import { StyleSheet } from "react-native";
import { colors, radius, shadow, size, spacing, typography } from "../theme/design";

export const appToastStyles = StyleSheet.create({
  toast: { position: "absolute", left: spacing.page, right: spacing.page, bottom: spacing.hero, alignSelf: "center", minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, ...shadow.soft },
  toastText: { flexShrink: 1, color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold, textAlign: "center" }
});
