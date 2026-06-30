import React from "react";
import type { Card } from "@czech-flashcards/shared";
import { StudyCardActionButton } from "./StudyCardActionButton";
import { studyCardActionStyles } from "./studyCardActionStyles";

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
        style={studyCardActionStyles.saveButton}
        icon={isSaved ? "star" : "star-border"}
        label={isSaved ? `Remove ${current.cz} from My list` : `Add ${current.cz} to My list`}
        selected={isSaved}
        onPress={() => onToggleSaved(current.id)}
      />
      <StudyCardActionButton
        style={studyCardActionStyles.deckButton}
        icon="folder"
        label={`Add ${current.cz} to a deck`}
        onPress={() => onManageDecks(current)}
      />
      {showEdit && (
        <StudyCardActionButton style={studyCardActionStyles.editButton} icon="edit" label={`Edit ${current.cz}`} onPress={onEditCard} muted />
      )}
    </>
  );
}
