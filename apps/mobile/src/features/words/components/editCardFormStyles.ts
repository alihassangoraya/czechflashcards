import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

export const editCardFormStyles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold }
});
