import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { colors, radius, size, spacing } from "../../../theme/design";
import { CustomWordActions } from "./CustomWordActions";
import { CustomWordSummary } from "./CustomWordSummary";
import { DeleteWordWarning } from "./DeleteWordWarning";

type Props = {
  card: Card;
  decks: CustomDeck[];
  deleting: boolean;
  onRequestDelete: (cardId: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (cardId: string) => void;
  onEdit: (card: Card) => void;
};

export function CustomWordRow({ card, decks, deleting, onRequestDelete, onCancelDelete, onConfirmDelete, onEdit }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <CustomWordSummary card={card} decks={decks} />
        <CustomWordActions deleting={deleting} word={card.cz} onEdit={() => onEdit(card)} onRequestDelete={() => onRequestDelete(card.id)} />
      </View>
      {deleting && <DeleteWordWarning onCancel={onCancelDelete} onConfirm={() => onConfirmDelete(card.id)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.smd },
  row: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.md }
});
