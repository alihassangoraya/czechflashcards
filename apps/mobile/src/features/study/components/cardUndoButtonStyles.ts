import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const cardUndoButtonStyles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: spacing.xlPlus,
    alignSelf: "center",
    minHeight: size.touchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.smd,
    borderWidth: spacing.hairline,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: spacing.xl
  },
  text: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.45 }
});
