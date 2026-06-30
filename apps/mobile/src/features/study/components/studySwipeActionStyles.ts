import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const studySwipeActionStyles = StyleSheet.create({
  actions: { flexDirection: "row", justifyContent: "space-between", gap: spacing.lg, marginTop: spacing.xlPlus },
  button: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, borderWidth: spacing.hairline, paddingHorizontal: spacing.md },
  again: { borderColor: colors.dangerSoft, backgroundColor: colors.dangerSoft },
  known: { borderColor: colors.mintSoft, backgroundColor: colors.mintSoft },
  text: { fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  againText: { color: colors.danger },
  knownText: { color: colors.success },
  disabled: { opacity: 0.45 }
});
