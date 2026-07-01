import React from "react";
import { colors } from "../../../theme/design";
import { GrammarDetailCard } from "../../study/components/GrammarDetailCard";
import { RelatedWords } from "../../study/components/RelatedWords";
import { WordDetailsHeader } from "../../study/components/WordDetailsHeader";
import { useI18n } from "../../../i18n/I18nProvider";
import type { GrammarGuideProps } from "./grammarGuideTypes";

export function GrammarCardDetails({ card }: GrammarGuideProps) {
  const { t } = useI18n();

  return (
    <>
      <WordDetailsHeader category={card.googleCategory} />
      {card.grammar && <GrammarDetailCard grammar={card.grammar} />}
      {card.synonyms && <RelatedWords label={t("details.related")} icon="compare-arrows" value={card.synonyms} color={colors.iconSuccess} />}
      {card.antonyms && <RelatedWords label={t("details.opposites")} icon="swap-horiz" value={card.antonyms} color={colors.iconDanger} />}
    </>
  );
}
