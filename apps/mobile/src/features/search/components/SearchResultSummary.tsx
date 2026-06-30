import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  card: Card;
  meaningLanguage: MeaningLanguage;
  onStudy: (card: Card) => void;
};

export function SearchResultSummary({ card, meaningLanguage, onStudy }: Props) {
  const { t } = useI18n();
  const meaning = selectedMeaning(card, meaningLanguage);

  return (
    <Pressable style={styles.study} onPress={() => onStudy(card)} accessibilityRole="button" accessibilityLabel={t("search.studyWord", { word: card.cz })}>
      <View style={styles.heading}>
        <Text style={styles.word}>{card.cz}</Text>
        {card.grammar?.partOfSpeech && <Text style={styles.partOfSpeech}>{card.grammar.partOfSpeech}</Text>}
      </View>
      <Text style={styles.english}>{card.en}</Text>
      <Text style={[styles.meaning, meaningLanguage === "ur" && styles.rtl]}>{meaning}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  study: { flex: 1, gap: spacing.xxs },
  heading: { flexDirection: "row", alignItems: "center", gap: spacing.smd, flexWrap: "wrap" },
  word: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  partOfSpeech: { borderRadius: radius.sm, backgroundColor: colors.primarySoft, color: colors.primaryDeep, fontSize: typography.micro, fontWeight: typography.weightSemibold, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  english: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  meaning: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  rtl: { writingDirection: "rtl", textAlign: "right" }
});
