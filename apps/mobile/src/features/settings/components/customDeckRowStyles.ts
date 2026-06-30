import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const customDeckRowStyles = StyleSheet.create({
  customDeckRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingLeft: spacing.xl, paddingRight: spacing.lg, paddingVertical: spacing.smd },
  customDeckRowActive: { borderColor: colors.success },
  deckSelectArea: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  deckCopy: { flex: 1, gap: spacing.xxs },
  customDeckName: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  customDeckMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightRegular },
  deckEditInput: { flex: 1, minHeight: size.touchTarget, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  deckActions: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  iconAction: { width: size.navAction, height: size.navAction, alignItems: "center", justifyContent: "center" },
  deleteConfirm: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  deleteText: { color: colors.dangerStrong, fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
