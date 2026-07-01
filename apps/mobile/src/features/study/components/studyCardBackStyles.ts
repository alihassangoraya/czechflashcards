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
  answer: { alignSelf: "stretch", width: "100%", gap: spacing.mdPlus, marginTop: spacing.xl }
});
