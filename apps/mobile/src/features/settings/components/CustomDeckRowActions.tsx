import React from "react";
import type { CustomDeck } from "../../../database";
import type { CustomDeckActionLabels } from "./customDeckActionTypes";
import { CustomDeckDefaultActions } from "./CustomDeckDefaultActions";
import { CustomDeckDeleteActions } from "./CustomDeckDeleteActions";
import { CustomDeckEditActions } from "./CustomDeckEditActions";

type Props = {
  deck: CustomDeck;
  active: boolean;
  editing: boolean;
  deleting: boolean;
  labels: CustomDeckActionLabels;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onStartEditDeck: (deckId: string) => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export function CustomDeckRowActions({ deck, active, editing, deleting, labels, onCancelEditDeck, onSaveEditDeck, onStartEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: Props) {
  if (editing) {
    return <CustomDeckEditActions labels={labels} onCancelEditDeck={onCancelEditDeck} onSaveEditDeck={onSaveEditDeck} />;
  }

  if (deleting) {
    return <CustomDeckDeleteActions deck={deck} labels={labels} onCancelDeleteDeck={onCancelDeleteDeck} onConfirmDeleteDeck={onConfirmDeleteDeck} />;
  }

  return <CustomDeckDefaultActions deck={deck} active={active} labels={labels} onRequestDeleteDeck={onRequestDeleteDeck} onStartEditDeck={onStartEditDeck} />;
}
