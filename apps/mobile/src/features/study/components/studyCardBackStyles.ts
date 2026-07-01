import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

export const studyCardBackStyles = StyleSheet.create({
  topSpacer: { height: spacing.xlPlus },
  backWord: {
    color: colors.primary,
    fontSize: typography.cardTitle,
    fontWeight: typography.weightSemibold,
    textAlign: "center",
    marginBottom: spacing.xs
  },
  answer: { alignSelf: "stretch", width: "100%", gap: spacing.md, marginTop: spacing.lg }
});
