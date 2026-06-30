import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { speak } from "../../../services/speech";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { pronunciationHint } from "../models/studyMeaning";

export function PronunciationPill({ card }: { card: Card }) {
  return (
    <Pressable
      style={styles.pill}
      onPress={(event) => { event.stopPropagation(); speak(card.cz, { language: "cs-CZ", rate: 0.86 }); }}
      accessibilityRole="button"
      accessibilityLabel={`Play ${card.cz}`}
    >
      <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
      <Text style={styles.text}>{card.pronunciation || pronunciationHint(card.cz)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xlPlus,
    borderRadius: radius.md,
    backgroundColor: colors.actionSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.smd
  },
  text: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
