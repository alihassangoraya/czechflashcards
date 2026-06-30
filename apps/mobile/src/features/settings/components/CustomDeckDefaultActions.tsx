import React from "react";
import { View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size } from "../../../theme/design";
import type { CustomDeckActionLabels } from "./customDeckActionTypes";
import { CustomDeckIconAction } from "./CustomDeckIconAction";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  deck: CustomDeck;
  active: boolean;
  labels: CustomDeckActionLabels;
  onRequestDeleteDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
};

export function CustomDeckDefaultActions({ deck, active, labels, onRequestDeleteDeck, onStartEditDeck }: Props) {
  return (
    <View style={styles.deckActions}>
      {active && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
      <CustomDeckIconAction icon="edit" color={colors.action} label={labels.renameDeck} onPress={() => onStartEditDeck(deck.id)} />
      <CustomDeckIconAction icon="delete-outline" color={colors.dangerStrong} label={labels.deleteDeck} onPress={() => onRequestDeleteDeck(deck.id)} />
    </View>
  );
}
