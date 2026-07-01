import React from "react";
import { View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors } from "../../../theme/design";
import { RelatedWords } from "./RelatedWords";
import { studyCardRelatedWordsStyles as styles } from "./studyCardRelatedWordsStyles";

type Props = {
  card: Card;
};

export function StudyCardRelatedWords({ card }: Props) {
  const { t } = useI18n();
  if (!card.synonyms && !card.antonyms) return null;

  return (
    <View style={styles.related}>
      {card.synonyms ? <RelatedWords label={t("details.related")} icon="compare-arrows" value={card.synonyms} color={colors.iconSuccess} /> : null}
      {card.antonyms ? <RelatedWords label={t("details.opposites")} icon="swap-horiz" value={card.antonyms} color={colors.iconDanger} /> : null}
    </View>
  );
}
