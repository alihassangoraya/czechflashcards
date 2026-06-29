import React from "react";
import { Pressable, StyleSheet } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing } from "../../../theme/design";

type Props = {
  current: Card;
  isSaved: boolean;
  showEdit: boolean;
  onToggleSaved: (cardId: string) => void;
  onEditCard: () => void;
};

export function StudyCardActions({ current, isSaved, showEdit, onToggleSaved, onEditCard }: Props) {
  return (
    <>
      <Pressable
        style={styles.saveButton}
        onPressIn={(event) => event.stopPropagation()}
        onPress={(event) => { event.stopPropagation(); onToggleSaved(current.id); }}
        accessibilityRole="button"
        accessibilityState={{ selected: isSaved }}
        accessibilityLabel={isSaved ? `Remove ${current.cz} from My list` : `Add ${current.cz} to My list`}
      >
        <MaterialIcons name={isSaved ? "star" : "star-border"} size={size.icon} color={colors.action} />
      </Pressable>
      {showEdit && (
        <Pressable style={styles.editButton} onPress={(event) => { event.stopPropagation(); onEditCard(); }} accessibilityRole="button" accessibilityLabel={`Edit ${current.cz}`}>
          <MaterialIcons name="edit" size={size.iconMedium} color={colors.actionMuted} />
        </Pressable>
      )}
    </>
  );
}

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

const styles = StyleSheet.create({
  saveButton: { ...actionBase, left: spacing.xlPlus },
  editButton: { ...actionBase, right: spacing.xlPlus }
});
