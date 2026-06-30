import { StyleSheet } from "react-native";
import { colors, radius, size, spacing } from "../theme/design";

export const headerIconStyles = StyleSheet.create({
  headerIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface },
  headerIconPrimary: { borderColor: colors.action, backgroundColor: colors.action }
});
