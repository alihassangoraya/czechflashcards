import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import type { CustomDeckListItem } from "./customDeckListItems";
import { CustomDeckRow } from "./CustomDeckRow";

type Props = {
  items: CustomDeckListItem[];
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

export function CustomDeckList({ items, activeDeckId, editingDeckId, editingDeckName, deleteDeckId, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: Props) {
  if (!items.length) return null;

  return (
    <View style={styles.customDeckList}>
      {items.map(({ deck, count }) => (
        <CustomDeckRow
          key={deck.id}
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
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  customDeckList: { gap: spacing.smd }
});
