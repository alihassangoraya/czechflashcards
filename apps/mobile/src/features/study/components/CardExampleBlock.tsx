import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { ExampleSpeechButton } from "./ExampleSpeechButton";

export function CardExampleBlock({ card }: { card: Card }) {
  const { t, textAlign } = useI18n();

  if (!card.sentence) return null;

  return (
    <View style={styles.exampleBlock}>
      <Text style={[styles.contentLabel, { textAlign }]}>{t("study.inContext")}</Text>
      <ExampleSpeechButton label={t("study.playExample")} sentence={card.sentence} />
      {Boolean(card.sentenceEn) && <Text style={styles.muted} numberOfLines={2}>{card.sentenceEn}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  contentLabel: {
    color: colors.action,
    fontSize: typography.caption,
    fontWeight: typography.weightSemibold,
    textTransform: "uppercase"
  },
  exampleBlock: { gap: spacing.smd, marginTop: spacing.smd },
  muted: {
    color: colors.textMuted,
    fontSize: typography.bodyLarge,
    lineHeight: typography.cardBodyLine
  }
});
