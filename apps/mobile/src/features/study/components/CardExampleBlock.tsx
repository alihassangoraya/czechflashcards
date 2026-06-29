import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import * as Speech from "../../../speech";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function CardExampleBlock({ card }: { card: Card }) {
  if (!card.sentence) return null;

  return (
    <View style={styles.exampleBlock}>
      <Text style={styles.contentLabel}>In context</Text>
      <Pressable
        style={styles.exampleSpeech}
        onPress={(event) => { event.stopPropagation(); Speech.speak(card.sentence, { language: "cs-CZ", rate: 0.86 }); }}
        accessibilityRole="button"
        accessibilityLabel="Play Czech example"
      >
        <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
        <Text style={styles.example} numberOfLines={2}>{card.sentence}</Text>
      </Pressable>
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
  exampleBlock: { gap: 5, marginTop: 5 },
  exampleSpeech: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.actionSoft,
    paddingHorizontal: spacing.mdPlus,
    paddingVertical: spacing.smd
  },
  example: {
    flex: 1,
    fontSize: typography.cardBody,
    lineHeight: typography.cardBodyLine,
    color: colors.textExample
  },
  muted: {
    color: colors.textMuted,
    fontSize: typography.bodyLarge,
    lineHeight: typography.cardBodyLine
  }
});
