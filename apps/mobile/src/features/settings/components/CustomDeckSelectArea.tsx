import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size } from "../../../theme/design";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  deck: CustomDeck;
  countLabel: string;
  active: boolean;
  editing: boolean;
  editingDeckName: string;
  onSelectDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onSaveEditDeck: () => void;
};

export function CustomDeckSelectArea({ deck, countLabel, active, editing, editingDeckName, onSelectDeck, onEditingDeckNameChange, onSaveEditDeck }: Props) {
  return (
    <Pressable style={styles.deckSelectArea} onPress={() => onSelectDeck(deck.id)} accessibilityRole="button">
      <MaterialIcons name="folder" size={size.iconSmall} color={active ? colors.primaryDeep : colors.textMuted} />
      {editing ? (
        <TextInput style={styles.deckEditInput} value={editingDeckName} onChangeText={onEditingDeckNameChange} autoFocus returnKeyType="done" onSubmitEditing={onSaveEditDeck} />
      ) : (
        <View style={styles.deckCopy}>
          <Text style={styles.customDeckName}>{deck.name}</Text>
          <Text style={styles.customDeckMeta}>{countLabel}</Text>
        </View>
      )}
    </Pressable>
  );
}
