import { StyleSheet } from "react-native";
import { colors, radius, size, spacing } from "../../../theme/design";

const actionBase = {
  position: "absolute" as const,
  top: spacing.xlPlus,
  zIndex: spacing.sm,
  width: size.cardAction,
  height: size.cardAction,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  borderWidth: spacing.hairline,
  borderColor: colors.border,
  borderRadius: radius.md,
  backgroundColor: colors.surface
};

export const studyCardActionStyles = StyleSheet.create({
  saveButton: { ...actionBase, left: spacing.xlPlus },
  deckButton: { ...actionBase, left: spacing.xlPlus + size.cardAction + spacing.smd },
  editButton: { ...actionBase, right: spacing.xlPlus }
});
