import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const grammarInfoCardStyles = StyleSheet.create({
  card: { gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.lg },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  iconTile: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  label: { flex: 1, fontSize: typography.caption, fontWeight: typography.weightBold, textTransform: "uppercase" },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs, fontWeight: typography.weightRegular }
});
