import React from "react";
import { Text, View } from "react-native";
import type { CustomDeck } from "../../../database";
import { colors } from "../../../theme/design";
import type { CustomDeckActionLabels } from "./customDeckActionTypes";
import { CustomDeckIconAction } from "./CustomDeckIconAction";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  deck: CustomDeck;
  labels: CustomDeckActionLabels;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export function CustomDeckDeleteActions({ deck, labels, onCancelDeleteDeck, onConfirmDeleteDeck }: Props) {
  return (
    <View style={styles.deleteConfirm}>
      <Text style={styles.deleteText}>{labels.deleteQuestion}</Text>
      <CustomDeckIconAction icon="delete-outline" color={colors.dangerStrong} label={labels.deleteDeck} onPress={() => onConfirmDeleteDeck(deck.id)} />
      <CustomDeckIconAction icon="close" color={colors.textMuted} label={labels.keepDeck} onPress={onCancelDeleteDeck} />
    </View>
  );
}
