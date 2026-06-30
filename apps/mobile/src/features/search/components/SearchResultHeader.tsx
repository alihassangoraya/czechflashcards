import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { searchResultDeckTag } from "../models/searchResultDeckTag";

type Props = { card: Card };

export function SearchResultHeader({ card }: Props) {
  const meta = [card.level.toUpperCase(), searchResultDeckTag(card), card.source !== "seed" ? card.source : ""].filter(Boolean).join(" - ");

  return (
    <View style={styles.topLine}>
      <View style={styles.wordGroup}>
        <Text style={styles.word}>{card.cz}</Text>
        {Boolean(card.pronunciation) && <Text style={styles.pronunciation}>[{card.pronunciation}]</Text>}
      </View>
      <View style={styles.badges}>
        {card.grammar?.partOfSpeech && <Text style={styles.partOfSpeech}>{card.grammar.partOfSpeech}</Text>}
        <Text style={styles.meta}>{meta}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topLine: { flexDirection: "row", justifyContent: "space-between", gap: spacing.lg, flexWrap: "wrap" },
  wordGroup: { minWidth: size.searchResultMinWidth, flexGrow: 1, gap: spacing.xxs },
  word: { color: colors.textStrong, fontSize: typography.titleSmall, lineHeight: typography.cardBodyLine, fontWeight: typography.weightSemibold },
  pronunciation: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  badges: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: spacing.smd, flexWrap: "wrap" },
  partOfSpeech: { borderRadius: radius.sm, backgroundColor: colors.primarySoft, color: colors.primaryDeep, fontSize: typography.micro, fontWeight: typography.weightSemibold, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  meta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
