import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import * as Speech from "../../../speech";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";

export function QuizPromptCard({ card }: { card: Card }) {
  return (
    <View style={styles.promptCard}>
      <Text style={styles.promptLabel}>Choose the matching meaning</Text>
      <Text style={styles.word}>{card.cz}</Text>
      <Pressable style={styles.audioLine} onPress={() => Speech.speak(card.cz, { language: "cs-CZ", rate: 0.86 })} accessibilityRole="button" accessibilityLabel={`Play ${card.cz}`}>
        <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
        <Text style={styles.pronunciation}>[ {card.pronunciation || card.cz} ]</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  promptCard: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  promptLabel: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, textAlign: "center" },
  word: { color: colors.textStrong, fontSize: typography.word, lineHeight: typography.word + spacing.lg, fontWeight: typography.weightBold, textAlign: "center" },
  audioLine: { alignSelf: "center", flexDirection: "row", alignItems: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  pronunciation: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
