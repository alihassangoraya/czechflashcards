import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { customDeckCardCount } from "../../../app/deckFiltering";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { SettingsSection } from "./SettingsSection";

type Props = {
  deckName: string;
  decks: CustomDeck[];
  cards: Card[];
  deckMemberships: Record<string, string[]>;
  activeDeckId: string;
  editingDeckId: string | null;
  editingDeckName: string;
  deleteDeckId: string | null;
  onDeckNameChange: (value: string) => void;
  onCreateDeck: () => void;
  onSelectDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export function CustomDeckSection({ deckName, decks, cards, deckMemberships, activeDeckId, editingDeckId, editingDeckName, deleteDeckId, onDeckNameChange, onCreateDeck, onSelectDeck, onStartEditDeck, onEditingDeckNameChange, onCancelEditDeck, onSaveEditDeck, onRequestDeleteDeck, onCancelDeleteDeck, onConfirmDeleteDeck }: Props) {
  return (
    <SettingsSection icon="folder" title="My decks" description="Keep your own words together.">
      <View style={styles.deckCreateRow}>
        <TextInput style={styles.deckInput} value={deckName} onChangeText={onDeckNameChange} placeholder="Deck name" placeholderTextColor={colors.textMuted} returnKeyType="done" onSubmitEditing={onCreateDeck} />
        <Pressable style={styles.addDeckButton} onPress={onCreateDeck} accessibilityRole="button" accessibilityLabel="Create deck">
          <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
        </Pressable>
      </View>
      {decks.length > 0 && (
        <View style={styles.customDeckList}>
          {decks.map((deck) => {
            const active = activeDeckId === deck.id;
            const editing = editingDeckId === deck.id;
            const deleting = deleteDeckId === deck.id;
            const count = customDeckCardCount(deck, cards, deckMemberships);

            return (
              <View key={deck.id} style={[styles.customDeckRow, active && styles.customDeckRowActive]}>
                <Pressable style={styles.deckSelectArea} onPress={() => onSelectDeck(deck.id)} accessibilityRole="button">
                  <MaterialIcons name="folder" size={size.iconSmall} color={active ? colors.primaryDeep : colors.textMuted} />
                  {editing ? (
                    <TextInput
                      style={styles.deckEditInput}
                      value={editingDeckName}
                      onChangeText={onEditingDeckNameChange}
                      autoFocus
                      returnKeyType="done"
                      onSubmitEditing={onSaveEditDeck}
                    />
                  ) : (
                    <View style={styles.deckCopy}>
                      <Text style={styles.customDeckName}>{deck.name}</Text>
                      <Text style={styles.customDeckMeta}>{count} {count === 1 ? "word" : "words"}</Text>
                    </View>
                  )}
                </Pressable>

                {editing ? (
                  <View style={styles.deckActions}>
                    <Pressable style={styles.iconAction} onPress={onSaveEditDeck} accessibilityRole="button" accessibilityLabel={`Save ${deck.name}`}>
                      <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />
                    </Pressable>
                    <Pressable style={styles.iconAction} onPress={onCancelEditDeck} accessibilityRole="button" accessibilityLabel={`Cancel editing ${deck.name}`}>
                      <MaterialIcons name="close" size={size.iconSmall} color={colors.textMuted} />
                    </Pressable>
                  </View>
                ) : deleting ? (
                  <View style={styles.deleteConfirm}>
                    <Text style={styles.deleteText}>Delete?</Text>
                    <Pressable style={styles.iconAction} onPress={() => onConfirmDeleteDeck(deck.id)} accessibilityRole="button" accessibilityLabel={`Delete ${deck.name}`}>
                      <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.dangerStrong} />
                    </Pressable>
                    <Pressable style={styles.iconAction} onPress={onCancelDeleteDeck} accessibilityRole="button" accessibilityLabel={`Keep ${deck.name}`}>
                      <MaterialIcons name="close" size={size.iconSmall} color={colors.textMuted} />
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.deckActions}>
                    {active && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
                    <Pressable style={styles.iconAction} onPress={() => onStartEditDeck(deck.id)} accessibilityRole="button" accessibilityLabel={`Rename ${deck.name}`}>
                      <MaterialIcons name="edit" size={size.iconSmall} color={colors.action} />
                    </Pressable>
                    <Pressable style={styles.iconAction} onPress={() => onRequestDeleteDeck(deck.id)} accessibilityRole="button" accessibilityLabel={`Delete ${deck.name}`}>
                      <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.dangerStrong} />
                    </Pressable>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  deckCreateRow: { flexDirection: "row", gap: spacing.lg },
  deckInput: { flex: 1, minHeight: size.touchTarget, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, color: colors.textStrong, fontSize: typography.body, paddingHorizontal: spacing.xl },
  addDeckButton: { width: size.touchTarget, height: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  customDeckList: { gap: spacing.smd },
  customDeckRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingLeft: spacing.xl, paddingRight: spacing.lg, paddingVertical: spacing.smd },
  customDeckRowActive: { borderColor: colors.success },
  deckSelectArea: { flex: 1, minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  deckCopy: { flex: 1, gap: spacing.xxs },
  customDeckName: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  customDeckMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightRegular },
  deckEditInput: { flex: 1, minHeight: size.touchTarget, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  deckActions: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  iconAction: { width: size.navAction, height: size.navAction, alignItems: "center", justifyContent: "center" },
  deleteConfirm: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  deleteText: { color: colors.dangerStrong, fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
