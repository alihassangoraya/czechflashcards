import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { colors, spacing, typography } from "../../../theme/design";
import { CardBackFaceContainer } from "./CardFaceContainer";
import { CardExampleBlock } from "./CardExampleBlock";
import { CardTranslationBlock } from "./CardTranslationBlock";

type Props = {
  current: Card;
  currentSecondaryMeaning: string;
  flipProgress: Animated.Value;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
};

export function StudyCardBack({ current, currentSecondaryMeaning, flipProgress, meaningLanguage, onFlipCard }: Props) {
  return (
    <CardBackFaceContainer flipProgress={flipProgress} onPress={onFlipCard}>
      <Text style={styles.backWord}>{current.cz}</Text>
      <View style={styles.answer}>
        <CardTranslationBlock card={current} secondaryMeaning={currentSecondaryMeaning} meaningLanguage={meaningLanguage} />
        <CardExampleBlock card={current} />
      </View>
      <Text style={styles.hint}>Tap to see Czech</Text>
    </CardBackFaceContainer>
  );
}

const styles = StyleSheet.create({
  backWord: {
    color: colors.primary,
    fontSize: typography.cardTitle,
    fontWeight: typography.weightSemibold,
    textAlign: "center",
    marginBottom: spacing.sm
  },
  answer: { gap: 7, marginTop: 12 },
  hint: {
    color: colors.textMuted,
    fontSize: typography.cardHint,
    marginTop: typography.bodyLarge,
    textAlign: "center",
    fontWeight: typography.weightRegular
  }
});
