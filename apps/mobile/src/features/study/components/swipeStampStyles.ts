import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const swipeStampStyles = StyleSheet.create({
  stamp: {
    position: "absolute",
    zIndex: spacing.lgPlus,
    left: -spacing.lgPlus,
    right: -spacing.lgPlus,
    top: "50%",
    borderWidth: spacing.sm,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.stampSurface,
    fontSize: typography.stamp,
    fontWeight: typography.weightBlack,
    lineHeight: typography.stampLine,
    textAlign: "center",
    textTransform: "uppercase"
  },
  known: {
    color: colors.successStrong,
    borderColor: colors.successStrong,
    transform: [{ translateY: -size.headerAction }, { rotate: "-18deg" }]
  },
  again: {
    color: colors.dangerStrong,
    borderColor: colors.dangerStrong,
    transform: [{ translateY: -size.headerAction }, { rotate: "18deg" }]
  }
});
