import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";

export const cardFacePressableStyles = StyleSheet.create({
  cardFace: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    backfaceVisibility: "hidden"
  },
  cardBack: { backgroundColor: colors.surfaceSecondary }
});
