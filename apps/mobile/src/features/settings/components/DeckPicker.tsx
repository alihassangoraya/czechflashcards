import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import type { CustomDeck } from "../../../database";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { deckLabel } from "../models/settingsFormat";
import { deckOptions } from "../models/settingsOptions";

type Props = {
  value: string;
  decks: CustomDeck[];
  onChange: (value: string) => void;
};

export function DeckPicker({ value, decks, onChange }: Props) {
  const options = [...deckOptions, ...decks.map((deck) => deck.id)];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckPicker}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.deckChip, value === option && styles.deckChipActive]} onPress={() => onChange(option)}>
          <Text style={[styles.deckChipText, value === option && styles.deckChipTextActive]}>{deckLabel(option, decks)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  deckPicker: { gap: spacing.smd, paddingRight: spacing.xl },
  deckChip: { borderRadius: radius.md, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  deckChipActive: { backgroundColor: colors.primaryDeep },
  deckChipText: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  deckChipTextActive: { color: colors.onPrimary, fontWeight: typography.weightSemibold }
});
