import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";
import { GrammarDetailCard } from "./GrammarDetailCard";
import { WordDetailsHeader } from "./WordDetailsHeader";
import type { WordDetailsPanelProps } from "./wordDetailsPanelTypes";

export function WordDetailsPanel({ card }: WordDetailsPanelProps) {
  if (!card.grammar && !card.googleCategory) return null;

  return (
    <View style={styles.wordDetails}>
      <WordDetailsHeader category={card.googleCategory} />
      {card.grammar && <GrammarDetailCard grammar={card.grammar} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wordDetails: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xl }
});
