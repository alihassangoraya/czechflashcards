import React from "react";
import { View } from "react-native";
import { colors } from "../../../theme/design";
import type { CustomDeckActionLabels } from "./customDeckActionTypes";
import { CustomDeckIconAction } from "./CustomDeckIconAction";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  labels: CustomDeckActionLabels;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
};

export function CustomDeckEditActions({ labels, onCancelEditDeck, onSaveEditDeck }: Props) {
  return (
    <View style={styles.deckActions}>
      <CustomDeckIconAction icon="check" color={colors.iconSuccess} label={labels.saveDeck} onPress={onSaveEditDeck} />
      <CustomDeckIconAction icon="close" color={colors.iconMuted} label={labels.cancelEdit} onPress={onCancelEditDeck} />
    </View>
  );
}
