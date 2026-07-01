import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import { languageDisplayNames } from "../../../i18n/languageDisplayNames";
import { colors, size, spacing, typography } from "../../../theme/design";

type Props = { card: Card; meaningLanguage: MeaningLanguage };

export function SearchResultTranslations({ card, meaningLanguage }: Props) {
  const meaning = selectedMeaning(card, meaningLanguage).trim();
  const english = String(card.en || "").trim();
  const showSelectedMeaning = Boolean(meaning) && meaningLanguage !== "en" && meaning !== english;
  const isRtl = meaningLanguage === "ur";

  return (
    <View style={styles.translationGrid}>
      <View style={styles.translationBlock}>
        <Text style={styles.label}>{languageDisplayNames.en}</Text>
        <Text style={styles.translation}>{english}</Text>
      </View>
      {showSelectedMeaning && (
        <View style={styles.translationBlock}>
          <Text style={[styles.label, isRtl && styles.rtl]}>{languageDisplayNames[meaningLanguage]}</Text>
          <Text style={[styles.translation, isRtl && styles.rtl]}>{meaning}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  translationGrid: { flexDirection: "row", gap: spacing.lg, flexWrap: "wrap" },
  translationBlock: { minWidth: size.searchResultMinWidth, flex: 1, gap: spacing.xxs },
  label: { color: colors.action, fontSize: typography.micro, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  translation: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLine, fontWeight: typography.weightMedium },
  rtl: { writingDirection: "rtl", textAlign: "right" }
});
