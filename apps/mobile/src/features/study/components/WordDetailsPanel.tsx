import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing } from "../../../theme/design";
import { GrammarDetailCard } from "./GrammarDetailCard";
import { RelatedWords } from "./RelatedWords";
import { WordDetailsHeader } from "./WordDetailsHeader";
import type { WordDetailsPanelProps } from "./wordDetailsPanelTypes";

export function WordDetailsPanel({ card }: WordDetailsPanelProps) {
  const { t } = useI18n();
  const hasRelatedWords = Boolean(card.synonyms || card.antonyms);
  if (!hasRelatedWords && !card.grammar && !card.googleCategory) return null;

  return (
    <View style={styles.wordDetails}>
      <WordDetailsHeader category={card.googleCategory} />
      {card.grammar && <GrammarDetailCard grammar={card.grammar} />}
      {card.synonyms && <RelatedWords label={t("details.related")} icon="compare-arrows" value={card.synonyms} color={colors.success} />}
      {card.antonyms && <RelatedWords label={t("details.opposites")} icon="swap-horiz" value={card.antonyms} color={colors.danger} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wordDetails: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xl }
});
