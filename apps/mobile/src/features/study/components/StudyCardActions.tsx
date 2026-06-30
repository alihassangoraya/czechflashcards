import React from "react";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
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
  const { t } = useI18n();

  return (
    <>
      <StudyCardActionButton
        style={studyCardActionStyles.saveButton}
        icon={isSaved ? "star" : "star-border"}
        label={isSaved ? t("study.removeFromMyList", { word: current.cz }) : t("study.addToMyList", { word: current.cz })}
        selected={isSaved}
        onPress={() => onToggleSaved(current.id)}
      />
      <StudyCardActionButton
        style={studyCardActionStyles.deckButton}
        icon="folder"
        label={t("study.addToDeck", { word: current.cz })}
        onPress={() => onManageDecks(current)}
      />
      {showEdit && (
        <StudyCardActionButton style={studyCardActionStyles.editButton} icon="edit" label={t("study.editCard", { word: current.cz })} onPress={onEditCard} muted />
      )}
    </>
  );
}
