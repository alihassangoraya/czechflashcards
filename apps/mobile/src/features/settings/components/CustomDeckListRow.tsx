import React from "react";
import { CustomDeckRow } from "./CustomDeckRow";
import type { CustomDeckListRowProps } from "./customDeckListTypes";

export function CustomDeckListRow({ item, activeDeckId, editingDeckId, editingDeckName, deleteDeckId, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: CustomDeckListRowProps) {
  const { deck, count } = item;

  return (
    <CustomDeckRow
      deck={deck}
      count={count}
      active={activeDeckId === deck.id}
      editing={editingDeckId === deck.id}
      deleting={deleteDeckId === deck.id}
      editingDeckName={editingDeckName}
      onSelectDeck={onSelectDeck}
      onStartEditDeck={onStartEditDeck}
      onEditingDeckNameChange={onEditingDeckNameChange}
      onCancelEditDeck={onCancelEditDeck}
      onSaveEditDeck={onSaveEditDeck}
      onRequestDeleteDeck={onRequestDeleteDeck}
      onCancelDeleteDeck={onCancelDeleteDeck}
      onConfirmDeleteDeck={onConfirmDeleteDeck}
    />
  );
}
