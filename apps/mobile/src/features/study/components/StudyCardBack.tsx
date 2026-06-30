import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { CardBackFaceContainer } from "./CardFaceContainer";
import { CardExampleBlock } from "./CardExampleBlock";
import { CardTranslationBlock } from "./CardTranslationBlock";
import { StudyCardHint } from "./StudyCardHint";

type Props = {
  current: Card;
  currentSecondaryMeaning: string;
  flipProgress: Animated.Value;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
};

export function StudyCardBack({ current, currentSecondaryMeaning, flipProgress, meaningLanguage, onFlipCard }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <CardBackFaceContainer flipProgress={flipProgress} onPress={onFlipCard}>
      <Text style={styles.backWord}>{current.cz}</Text>
      <View style={styles.answer}>
        <CardTranslationBlock card={current} secondaryMeaning={currentSecondaryMeaning} meaningLanguage={meaningLanguage} />
        <CardExampleBlock card={current} />
      </View>
      <StudyCardHint textAlign={textAlign}>{t("study.tapCzech")}</StudyCardHint>
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
  answer: { gap: spacing.mdPlus, marginTop: spacing.xl }
});
