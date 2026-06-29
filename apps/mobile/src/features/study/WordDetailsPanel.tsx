import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../theme/design";

export function WordDetailsPanel({ card }: { card: Card }) {
  const hasRelatedWords = Boolean(card.synonyms || card.antonyms);
  if (!hasRelatedWords && !card.grammar && !card.googleCategory) return null;

  return (
    <View style={styles.wordDetails}>
      <View style={styles.wordDetailsHeader}>
        <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.primaryDeep} />
        <Text style={styles.wordDetailsTitle}>Word details</Text>
        {card.googleCategory && <Text style={styles.wordDetailsCategory}>{card.googleCategory}</Text>}
      </View>
      {card.grammar && (
        <View style={styles.grammarDetail}>
          <Text style={styles.detailLabel}>Grammar</Text>
          <Text style={styles.grammarDetailTitle}>{card.grammar.partOfSpeech}{card.grammar.reflexive ? " · reflexive" : ""}</Text>
          <Text style={styles.grammarDetailText}>{card.grammar.note}</Text>
        </View>
      )}
      {card.synonyms && <RelatedWords label="Related words" icon="compare-arrows" value={card.synonyms} color={colors.success} />}
      {card.antonyms && <RelatedWords label="Opposites" icon="swap-horiz" value={card.antonyms} color={colors.danger} />}
    </View>
  );
}

function RelatedWords({ label, icon, value, color }: { label: string; icon: React.ComponentProps<typeof MaterialIcons>["name"]; value: string; color: string }) {
  const words = value.split(",").map((word) => word.trim()).filter(Boolean);
  if (!words.length) return null;
  return (
    <View style={styles.relatedWords}>
      <View style={styles.relatedWordsHeader}>
        <MaterialIcons name={icon} size={size.iconSmall} color={color} />
        <Text style={[styles.detailLabel, { color }]}>{label}</Text>
      </View>
      <View style={styles.relatedWordChips}>
        {words.map((word) => <Text key={word} style={styles.relatedWordChip}>{word}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordDetails: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  wordDetailsHeader: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  wordDetailsTitle: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  wordDetailsCategory: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium, textAlign: "right" },
  grammarDetail: { gap: spacing.xs, borderLeftWidth: spacing.xxs, borderLeftColor: colors.primary, paddingLeft: spacing.lg },
  detailLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  grammarDetailTitle: { color: colors.primaryDeep, fontSize: typography.body, fontWeight: typography.weightSemibold },
  grammarDetailText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs },
  relatedWords: { gap: spacing.smd },
  relatedWordsHeader: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  relatedWordChips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.smd },
  relatedWordChip: { overflow: "hidden", borderRadius: radius.sm, backgroundColor: colors.surfaceMuted, color: colors.textExample, fontSize: typography.bodySmall, fontWeight: typography.weightMedium, paddingHorizontal: spacing.md, paddingVertical: spacing.xs }
});
