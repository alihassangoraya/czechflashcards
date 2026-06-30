import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing } from "../../../theme/design";

type Props = {
  deleting: boolean;
  word: string;
  onEdit: () => void;
  onRequestDelete: () => void;
};

export function CustomWordActions({ deleting, word, onEdit, onRequestDelete }: Props) {
  return (
    <View style={styles.actions}>
      <Pressable style={styles.editButton} onPress={onEdit} accessibilityRole="button" accessibilityLabel={`Edit ${word}`}>
        <MaterialIcons name="edit" size={size.iconSmall} color={colors.action} />
      </Pressable>
      <Pressable style={[styles.deleteButton, deleting && styles.deleteButtonActive]} onPress={onRequestDelete} accessibilityRole="button" accessibilityLabel={`Delete ${word}`}>
        <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  editButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.actionSoft },
  deleteButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.dangerSoft },
  deleteButtonActive: { borderWidth: spacing.hairline, borderColor: colors.danger }
});
