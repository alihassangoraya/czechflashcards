import React from "react";
import { StyleSheet } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, size, spacing } from "../../../theme/design";
import { StudyCardActionButton } from "./StudyCardActionButton";

type Props = {
  current: Card;
  isSaved: boolean;
  showEdit: boolean;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
};

export function StudyCardActions({ current, isSaved, showEdit, onToggleSaved, onManageDecks, onEditCard }: Props) {
  return (
    <>
      <StudyCardActionButton
        style={styles.saveButton}
        icon={isSaved ? "star" : "star-border"}
        label={isSaved ? `Remove ${current.cz} from My list` : `Add ${current.cz} to My list`}
        selected={isSaved}
        onPress={() => onToggleSaved(current.id)}
      />
      <StudyCardActionButton
        style={styles.deckButton}
        icon="folder"
        label={`Add ${current.cz} to a deck`}
        onPress={() => onManageDecks(current)}
      />
      {showEdit && (
        <StudyCardActionButton style={styles.editButton} icon="edit" label={`Edit ${current.cz}`} onPress={onEditCard} muted />
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
  deckButton: { ...actionBase, left: spacing.xlPlus + size.cardAction + spacing.smd },
  editButton: { ...actionBase, right: spacing.xlPlus }
});
