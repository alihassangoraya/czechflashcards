import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { getGrammarModel } from "../models/grammarModel";
import { GrammarBanner } from "./GrammarBanner";
import { GrammarCardDetails } from "./GrammarCardDetails";
import { GrammarInfoCard } from "./GrammarInfoCard";
import { GrammarExample } from "./GrammarExample";
import { GrammarNounGuide } from "./GrammarNounGuide";
import { GrammarVerbGuide } from "./GrammarVerbGuide";
import type { GrammarGuideProps } from "./grammarGuideTypes";

export function GrammarGuide({ card }: GrammarGuideProps) {
  const { t } = useI18n();
  const grammar = getGrammarModel(card);
  const gender = t(grammar.genderKey);
  const meta = grammar.isVerb ? t("grammar.verbMeta") : t("grammar.nounMeta", { gender });

  return (
    <View style={styles.guide}>
      <GrammarBanner word={card.cz} meta={meta} />
      {card.pronunciation ? <GrammarInfoCard icon="volume-up" label={t("grammar.pronunciation")} text={`[ ${card.pronunciation} ]`} /> : null}
      <GrammarCardDetails card={card} />
      {grammar.isVerb ? <GrammarVerbGuide word={card.cz} reflexive={Boolean(card.grammar?.reflexive || card.cz.includes(" se") || card.cz.includes(" si"))} /> : <GrammarNounGuide gender={gender} />}
      {card.sentence ? <GrammarExample text={t("grammar.example", { sentence: card.sentence })} /> : null}
      {card.sentenceEn ? <GrammarExample text={card.sentenceEn} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  guide: { gap: spacing.xl }
});
