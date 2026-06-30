import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

export const studyCardBackStyles = StyleSheet.create({
  backWord: {
    color: colors.primary,
    fontSize: typography.cardTitle,
    fontWeight: typography.weightSemibold,
    textAlign: "center",
    marginBottom: spacing.sm
  },
  answer: { gap: spacing.mdPlus, marginTop: spacing.xl }
});
