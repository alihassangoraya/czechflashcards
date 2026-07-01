import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CustomDeck } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { deckLabel } from "../models/settingsFormat";
import { deckOptions } from "../models/settingsOptions";

type Props = {
  value: string;
  decks: CustomDeck[];
  onChange: (value: string) => void;
};

export function DeckPicker({ value, decks, onChange }: Props) {
  const { t } = useI18n();
  const options = [...deckOptions, ...decks.map((deck) => deck.id)];
  return (
    <View style={styles.deckPicker}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.deckChip, value === option && styles.deckChipActive]} onPress={() => onChange(option)}>
          <Text style={[styles.deckChipText, value === option && styles.deckChipTextActive]}>{deckLabel(option, decks, t)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  deckPicker: { flexDirection: "row", flexWrap: "wrap", gap: spacing.smd },
  deckChip: { borderRadius: radius.lg, backgroundColor: colors.sheet, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  deckChipActive: { backgroundColor: colors.primaryDeep },
  deckChipText: { color: colors.textBody, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  deckChipTextActive: { color: colors.onPrimary, fontWeight: typography.weightSemibold }
});
