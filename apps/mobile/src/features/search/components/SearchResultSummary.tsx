import React from "react";
import { Pressable, StyleSheet } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { SearchResultExample } from "./SearchResultExample";
import { SearchResultHeader } from "./SearchResultHeader";
import { SearchResultTranslations } from "./SearchResultTranslations";

type Props = {
  card: Card;
  meaningLanguage: MeaningLanguage;
  onStudy: (card: Card) => void;
};

export function SearchResultSummary({ card, meaningLanguage, onStudy }: Props) {
  const { t } = useI18n();

  return (
    <Pressable style={styles.study} onPress={() => onStudy(card)} accessibilityRole="button" accessibilityLabel={t("search.studyWord", { word: card.cz })}>
      <SearchResultHeader card={card} />
      <SearchResultTranslations card={card} meaningLanguage={meaningLanguage} />
      <SearchResultExample card={card} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  study: { gap: spacing.md }
});
