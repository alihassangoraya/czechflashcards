import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { getGrammarModel } from "../grammarModel";
import { GrammarBanner } from "./GrammarBanner";
import { GrammarExample } from "./GrammarExample";
import { GrammarNounGuide } from "./GrammarNounGuide";
import { GrammarVerbGuide } from "./GrammarVerbGuide";

export function GrammarGuide({ card }: { card: Card }) {
  const { t } = useI18n();
  const grammar = getGrammarModel(card);
  const gender = t(grammar.genderKey);
  const meta = grammar.isVerb ? t("grammar.verbMeta") : t("grammar.nounMeta", { gender });

  return (
    <View style={styles.guide}>
      <GrammarBanner word={card.cz} meta={meta} />
      {grammar.isVerb ? <GrammarVerbGuide /> : <GrammarNounGuide gender={gender} />}
      {card.sentence ? <GrammarExample text={t("grammar.example", { sentence: card.sentence })} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  guide: { gap: spacing.xl }
});
