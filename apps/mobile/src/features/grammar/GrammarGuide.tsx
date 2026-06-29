import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, spacing, typography } from "../../theme/design";

export function GrammarGuide({ card }: { card: Card }) {
  const verb = card.en.toLowerCase().startsWith("to ") || card.tags.includes("verbs") || card.cz.split(" ")[0].endsWith("t");
  const word = card.cz.toLowerCase().trim();
  const gender = word.endsWith("a") || word.endsWith("ost")
    ? "Likely feminine"
    : word.endsWith("o") || word.endsWith("e") || word.endsWith("ě")
      ? "Likely neuter"
      : "Likely masculine";

  return (
    <View style={styles.grammarGuide}>
      <View style={styles.grammarBanner}>
        <Text style={styles.grammarWord}>{card.cz}</Text>
        <Text style={styles.grammarMeta}>{verb ? "Verb (sloveso)" : `Noun or adjective · ${gender}`}</Text>
      </View>
      {verb ? (
        <>
          <Text style={styles.grammarHeading}>Present tense</Text>
          <Text style={styles.grammarCopy}>Czech verbs change with the subject. Learn this word with its full infinitive and listen for the ending in the example.</Text>
          <View style={styles.grammarTable}>
            <Text style={styles.grammarTableText}>já · ty · on/ona</Text>
            <Text style={styles.grammarTableText}>my · vy · oni</Text>
          </View>
          <Text style={styles.grammarCopy}>Aspect matters at B1: imperfective verbs describe an action or habit; perfective verbs focus on a completed result.</Text>
        </>
      ) : (
        <>
          <Text style={styles.grammarHeading}>Cases and gender</Text>
          <Text style={styles.grammarCopy}>{gender}. Czech endings change by case, so remember the word with a short phrase, not only on its own.</Text>
          <View style={styles.grammarTable}>
            <Text style={styles.grammarTableText}>1. nominative: basic form</Text>
            <Text style={styles.grammarTableText}>4. accusative: direct object</Text>
            <Text style={styles.grammarTableText}>6. locative: after v, na, o</Text>
            <Text style={styles.grammarTableText}>7. instrumental: after s</Text>
          </View>
        </>
      )}
      {card.sentence ? <Text style={styles.grammarExample}>Example: {card.sentence}</Text> : null}
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
