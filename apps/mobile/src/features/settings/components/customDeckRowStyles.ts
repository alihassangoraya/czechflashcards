import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export const customDeckRowStyles = StyleSheet.create({
  customDeckRow: { minHeight: size.actionMinHeight, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, paddingLeft: spacing.xl, paddingRight: spacing.lg, paddingVertical: spacing.md },
  customDeckRowActive: { borderColor: colors.primaryDeep, backgroundColor: colors.primarySoft },
  deckSelectArea: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  deckCopy: { flex: 1, gap: spacing.xxs },
  customDeckName: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  customDeckMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightRegular },
  deckEditInput: { flex: 1, minHeight: size.touchTarget, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  deckActions: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  iconAction: { width: size.navAction, height: size.navAction, alignItems: "center", justifyContent: "center" },
  deleteConfirm: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  deleteText: { color: colors.dangerStrong, fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
