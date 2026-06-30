import React from "react";
import { Pressable, Text, View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size } from "../../../theme/design";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  deck: CustomDeck;
  active: boolean;
  editing: boolean;
  deleting: boolean;
  labels: {
    cancelEdit: string;
    deleteDeck: string;
    deleteQuestion: string;
    keepDeck: string;
    renameDeck: string;
    saveDeck: string;
  };
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
        <IconAction icon="check" color={colors.success} label={labels.saveDeck} onPress={onSaveEditDeck} />
        <IconAction icon="close" color={colors.textMuted} label={labels.cancelEdit} onPress={onCancelEditDeck} />
      </View>
    );
  }

  if (deleting) {
    return (
      <View style={styles.deleteConfirm}>
        <Text style={styles.deleteText}>{labels.deleteQuestion}</Text>
        <IconAction icon="delete-outline" color={colors.dangerStrong} label={labels.deleteDeck} onPress={() => onConfirmDeleteDeck(deck.id)} />
        <IconAction icon="close" color={colors.textMuted} label={labels.keepDeck} onPress={onCancelDeleteDeck} />
      </View>
    );
  }

  return (
    <View style={styles.deckActions}>
      {active && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
      <IconAction icon="edit" color={colors.action} label={labels.renameDeck} onPress={() => onStartEditDeck(deck.id)} />
      <IconAction icon="delete-outline" color={colors.dangerStrong} label={labels.deleteDeck} onPress={() => onRequestDeleteDeck(deck.id)} />
    </View>
  );
}

type IconActionProps = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
  label: string;
  onPress: () => void;
};

function IconAction({ icon, color, label, onPress }: IconActionProps) {
  return (
    <Pressable style={styles.iconAction} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={color} />
    </Pressable>
  );
}
