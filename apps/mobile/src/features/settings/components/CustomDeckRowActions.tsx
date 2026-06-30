import React from "react";
import { Text, View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size } from "../../../theme/design";
import type { CustomDeckActionLabels } from "./customDeckActionTypes";
import { CustomDeckIconAction } from "./CustomDeckIconAction";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

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
    return (
      <View style={styles.deckActions}>
        <CustomDeckIconAction icon="check" color={colors.success} label={labels.saveDeck} onPress={onSaveEditDeck} />
        <CustomDeckIconAction icon="close" color={colors.textMuted} label={labels.cancelEdit} onPress={onCancelEditDeck} />
      </View>
    );
  }

  if (deleting) {
    return (
      <View style={styles.deleteConfirm}>
        <Text style={styles.deleteText}>{labels.deleteQuestion}</Text>
        <CustomDeckIconAction icon="delete-outline" color={colors.dangerStrong} label={labels.deleteDeck} onPress={() => onConfirmDeleteDeck(deck.id)} />
        <CustomDeckIconAction icon="close" color={colors.textMuted} label={labels.keepDeck} onPress={onCancelDeleteDeck} />
      </View>
    );
  }

  return (
    <View style={styles.deckActions}>
      {active && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
      <CustomDeckIconAction icon="edit" color={colors.action} label={labels.renameDeck} onPress={() => onStartEditDeck(deck.id)} />
      <CustomDeckIconAction icon="delete-outline" color={colors.dangerStrong} label={labels.deleteDeck} onPress={() => onRequestDeleteDeck(deck.id)} />
    </View>
  );
}
