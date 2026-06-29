import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { colors, spacing } from "../../../theme/design";
import { CustomWordRow } from "./CustomWordRow";
import { CustomWordsHeader } from "./CustomWordsHeader";

type Props = {
  cards: Card[];
  decks: CustomDeck[];
  deleteCandidateId: string | null;
  onRequestDelete: (cardId: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (cardId: string) => void;
  onEdit: (card: Card) => void;
};

export function CustomWordsList({ cards, decks, deleteCandidateId, onRequestDelete, onCancelDelete, onConfirmDelete, onEdit }: Props) {
  if (!cards.length) return null;

  return (
    <View style={styles.savedSection}>
      <CustomWordsHeader count={cards.length} />
      {cards.slice(0, 12).map((card) => (
        <CustomWordRow key={card.id} card={card} decks={decks} deleting={deleteCandidateId === card.id} onRequestDelete={onRequestDelete} onCancelDelete={onCancelDelete} onConfirmDelete={onConfirmDelete} onEdit={onEdit} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  savedSection: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xlPlus }
});
