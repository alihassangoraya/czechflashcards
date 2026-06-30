import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = { card: Card };

export function SearchResultExample({ card }: Props) {
  if (!card.sentence) return null;

  return (
    <View style={styles.exampleBox}>
      <Text style={styles.example} numberOfLines={2}>{card.sentence}</Text>
      {Boolean(card.sentenceEn) && <Text style={styles.exampleTranslation} numberOfLines={2}>{card.sentenceEn}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  exampleBox: { gap: spacing.xxs, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  example: { color: colors.textStrong, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge, fontWeight: typography.weightMedium },
  exampleTranslation: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
