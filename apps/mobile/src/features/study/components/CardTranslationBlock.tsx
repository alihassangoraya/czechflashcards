import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  card: Card;
  secondaryMeaning: string;
  meaningLanguage: StudySettings["meaningLanguage"];
};

export function CardTranslationBlock({ card, secondaryMeaning, meaningLanguage }: Props) {
  return (
    <View style={styles.answer}>
      <Text style={styles.contentLabel}>Translation</Text>
      <View style={styles.meaningRow}>
        <Text style={styles.meaning}>{card.en}</Text>
        {Boolean(secondaryMeaning) && (
          <Text style={[styles.meaning, meaningLanguage === "ur" && styles.rtl]}>
            {secondaryMeaning}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  answer: { gap: 7, marginTop: 12 },
  contentLabel: {
    color: colors.action,
    fontSize: typography.caption,
    fontWeight: typography.weightSemibold,
    textTransform: "uppercase"
  },
  meaningRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  meaning: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontSize: typography.bodyLarge,
    lineHeight: 21,
    color: colors.textBody,
    fontWeight: typography.weightMedium
  },
  rtl: { writingDirection: "rtl", textAlign: "right" }
});
