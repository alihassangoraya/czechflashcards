import { StyleSheet } from "react-native";
import { colors, radius, shadow, size, spacing } from "../../../theme/design";

export const searchResultRowStyles = StyleSheet.create({
  row: {
    gap: spacing.md,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.lgPlus,
    position: "relative",
    ...shadow.soft
  },
  actions: {
    position: "absolute",
    top: spacing.lgPlus,
    right: spacing.lgPlus,
    maxWidth: size.searchResultActionsWidth,
    zIndex: spacing.xxs
  }
});
