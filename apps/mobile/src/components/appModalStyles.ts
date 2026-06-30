import { StyleSheet } from "react-native";
import { colors, radius, size, spacing, typography } from "../theme/design";

export const appModalStyles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: colors.modalOverlay },
  modalSheet: { maxHeight: "90%", backgroundColor: colors.sheet, borderTopLeftRadius: radius.md, borderTopRightRadius: radius.md },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: spacing.panel, paddingBottom: spacing.xl, backgroundColor: colors.surface, borderBottomWidth: spacing.hairline, borderBottomColor: colors.border },
  modalTitle: { color: colors.textStrong, fontSize: size.icon, fontWeight: typography.weightBold },
  closeButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  closeButtonText: { color: colors.textStrong, fontSize: typography.display, lineHeight: typography.closeLine },
  modalContent: { gap: spacing.xlPlus, padding: spacing.page, paddingBottom: spacing.hero }
});
