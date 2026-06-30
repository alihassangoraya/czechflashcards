import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { customDeckCardCount } from "../../decks";
import { spacing } from "../../../theme/design";
import { CustomDeckRow } from "./CustomDeckRow";

type Props = {
  decks: CustomDeck[];
  cards: Card[];
  deckMemberships: Record<string, string[]>;
  activeDeckId: string;
  editingDeckId: string | null;
  editingDeckName: string;
  deleteDeckId: string | null;
  onSelectDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export function CustomDeckList({ decks, cards, deckMemberships, activeDeckId, editingDeckId, editingDeckName, deleteDeckId, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: Props) {
  if (!decks.length) return null;

  return (
    <View style={styles.customDeckList}>
      {decks.map((deck) => (
        <CustomDeckRow
          key={deck.id}
          deck={deck}
          count={customDeckCardCount(deck, cards, deckMemberships)}
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
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  customDeckList: { gap: spacing.smd }
});
