import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../theme/design";

export function GrammarGuide({ card }: { card: Card }) {
  const { t } = useI18n();
  const verb = card.en.toLowerCase().startsWith("to ") || card.tags.includes("verbs") || card.cz.split(" ")[0].endsWith("t");
  const word = card.cz.toLowerCase().trim();
  const gender = word.endsWith("a") || word.endsWith("ost")
    ? t("grammar.likelyFeminine")
    : word.endsWith("o") || word.endsWith("e") || word.endsWith("ě")
      ? t("grammar.likelyNeuter")
      : t("grammar.likelyMasculine");

  return (
    <View style={styles.grammarGuide}>
      <View style={styles.grammarBanner}>
        <Text style={styles.grammarWord}>{card.cz}</Text>
        <Text style={styles.grammarMeta}>{verb ? t("grammar.verbMeta") : t("grammar.nounMeta", { gender })}</Text>
      </View>
      {verb ? (
        <>
          <Text style={styles.grammarHeading}>{t("grammar.presentTense")}</Text>
          <Text style={styles.grammarCopy}>{t("grammar.verbCopy")}</Text>
          <View style={styles.grammarTable}>
            <Text style={styles.grammarTableText}>{t("grammar.subjectsSingular")}</Text>
            <Text style={styles.grammarTableText}>{t("grammar.subjectsPlural")}</Text>
          </View>
          <Text style={styles.grammarCopy}>{t("grammar.aspectCopy")}</Text>
        </>
      ) : (
        <>
          <Text style={styles.grammarHeading}>{t("grammar.casesGender")}</Text>
          <Text style={styles.grammarCopy}>{t("grammar.caseCopy", { gender })}</Text>
          <View style={styles.grammarTable}>
            <Text style={styles.grammarTableText}>{t("grammar.caseNom")}</Text>
            <Text style={styles.grammarTableText}>{t("grammar.caseAcc")}</Text>
            <Text style={styles.grammarTableText}>{t("grammar.caseLoc")}</Text>
            <Text style={styles.grammarTableText}>{t("grammar.caseIns")}</Text>
          </View>
        </>
      )}
      {card.sentence ? <Text style={styles.grammarExample}>{t("grammar.example", { sentence: card.sentence })}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grammarGuide: { gap: spacing.xl },
  grammarBanner: { gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.actionSoft, padding: spacing.xlPlus },
  grammarWord: { color: colors.primaryDeep, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  grammarMeta: { color: colors.actionMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  grammarHeading: { color: colors.primaryDeep, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold, marginTop: spacing.xxs },
  grammarCopy: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLarge + spacing.mdPlus, fontWeight: typography.weightRegular },
  grammarTable: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  grammarTableText: { color: colors.textExample, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs, fontWeight: typography.weightRegular },
  grammarExample: { color: colors.primary, fontSize: typography.body, lineHeight: typography.bodyLarge + spacing.sm, fontStyle: "italic", fontWeight: typography.weightRegular }
});
