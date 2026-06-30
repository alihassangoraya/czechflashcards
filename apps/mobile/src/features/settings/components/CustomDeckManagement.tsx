import React from "react";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { CustomDeckCreateRow } from "./CustomDeckCreateRow";
import { CustomDeckList } from "./CustomDeckList";
import { createCustomDeckListItems } from "./customDeckListItems";

export type CustomDeckManagementProps = {
  deckName: string;
  decks: CustomDeck[];
  cards: Card[];
  deckMemberships: Record<string, string[]>;
  activeDeckId: string;
  editingDeckId: string | null;
  editingDeckName: string;
  deleteDeckId: string | null;
  onDeckNameChange: (value: string) => void;
  onCreateDeck: () => void;
  onSelectDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export function CustomDeckManagement({ deckName, decks, cards, deckMemberships, activeDeckId, editingDeckId, editingDeckName, deleteDeckId, onDeckNameChange, onCreateDeck, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: CustomDeckManagementProps) {
  const deckItems = createCustomDeckListItems(decks, cards, deckMemberships);

  return (
    <>
      <CustomDeckCreateRow deckName={deckName} onDeckNameChange={onDeckNameChange} onCreateDeck={onCreateDeck} />
      <CustomDeckList
        items={deckItems}
        activeDeckId={activeDeckId}
        editingDeckId={editingDeckId}
        editingDeckName={editingDeckName}
        deleteDeckId={deleteDeckId}
        onSelectDeck={onSelectDeck}
        onStartEditDeck={onStartEditDeck}
        onEditingDeckNameChange={onEditingDeckNameChange}
        onCancelEditDeck={onCancelEditDeck}
        onSaveEditDeck={onSaveEditDeck}
        onRequestDeleteDeck={onRequestDeleteDeck}
        onCancelDeleteDeck={onCancelDeleteDeck}
        onConfirmDeleteDeck={onConfirmDeleteDeck}
      />
    </>
  );
}
