import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = { card: Card };

export function SearchResultLexicon({ card }: Props) {
  const { t } = useI18n();
  const rows = [
    card.synonyms && [t("search.synonyms"), card.synonyms],
    card.antonyms && [t("search.antonyms"), card.antonyms],
    card.grammar?.note && [t("search.grammar"), card.grammar.note]
  ].filter(Boolean) as string[][];
  if (!rows.length) return null;

  return (
    <View style={styles.grid}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.item}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.smd },
  item: { flexGrow: 1, flexBasis: "31%", borderRadius: radius.sm, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  label: { color: colors.textMuted, fontSize: typography.micro, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  value: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.compactLine }
});
