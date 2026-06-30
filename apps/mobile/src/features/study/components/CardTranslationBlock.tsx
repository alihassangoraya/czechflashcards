import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { CardMeaningRow } from "./CardMeaningRow";

type Props = {
  card: Card;
  secondaryMeaning: string;
  meaningLanguage: StudySettings["meaningLanguage"];
};

export function CardTranslationBlock({ card, secondaryMeaning, meaningLanguage }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.answer}>
      <Text style={[styles.contentLabel, { textAlign }]}>{t("study.translation")}</Text>
      <CardMeaningRow english={card.en} meaningLanguage={meaningLanguage} secondaryMeaning={secondaryMeaning} />
    </View>
  );
}

const styles = StyleSheet.create({
  answer: { gap: spacing.mdPlus, marginTop: spacing.xl },
  contentLabel: {
    color: colors.action,
    fontSize: typography.caption,
    fontWeight: typography.weightSemibold,
    textTransform: "uppercase"
  }
});
