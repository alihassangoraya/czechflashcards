import React from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { GrammarConjugationTable } from "./GrammarConjugationTable";
import { grammarVerbGuideStyles as styles } from "./grammarVerbGuideStyles";

type Props = {
  word?: string;
  reflexive?: boolean;
};

export function GrammarVerbGuide({ word = "", reflexive = false }: Props) {
  const { t } = useI18n();

  return (
    <>
      <Text style={styles.heading}>{t("grammar.presentTense")}</Text>
      <Text style={styles.copy}>{t("grammar.verbCopy")}</Text>
      {word ? <GrammarConjugationTable word={word} /> : (
        <View style={styles.table}>
          <Text style={styles.tableText}>{t("grammar.subjectsSingular")}</Text>
          <Text style={styles.tableText}>{t("grammar.subjectsPlural")}</Text>
        </View>
      )}
      {reflexive ? (
        <View style={styles.note}>
          <Text style={styles.noteTitle}>{t("grammar.reflexiveTitle")}</Text>
          <Text style={styles.tableText}>{t("grammar.reflexiveCopy")}</Text>
        </View>
      ) : null}
      <Text style={styles.rulesTitle}>{t("grammar.presentRules")}</Text>
      <Text style={styles.tableText}>{t("grammar.presentRulesCopy")}</Text>
      <Text style={styles.copy}>{t("grammar.aspectCopy")}</Text>
    </>
  );
}
