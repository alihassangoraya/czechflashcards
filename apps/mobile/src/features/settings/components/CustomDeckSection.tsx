import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { SettingsSection } from "./SettingsSection";

type Props = {
  deckName: string;
  decks: CustomDeck[];
  activeDeckId: string;
  onDeckNameChange: (value: string) => void;
  onCreateDeck: () => void;
  onSelectDeck: (deckId: string) => void;
};

export function CustomDeckSection({ deckName, decks, activeDeckId, onDeckNameChange, onCreateDeck, onSelectDeck }: Props) {
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
          {decks.map((deck) => (
            <Pressable key={deck.id} style={[styles.customDeckRow, activeDeckId === deck.id && styles.customDeckRowActive]} onPress={() => onSelectDeck(deck.id)}>
              <MaterialIcons name="folder" size={size.iconSmall} color={activeDeckId === deck.id ? colors.primaryDeep : colors.textMuted} />
              <Text style={styles.customDeckName}>{deck.name}</Text>
              {activeDeckId === deck.id && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
            </Pressable>
          ))}
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
  customDeckRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  customDeckRowActive: { borderColor: colors.success },
  customDeckName: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium }
});
