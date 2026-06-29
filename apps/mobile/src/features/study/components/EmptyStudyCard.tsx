import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

export function EmptyStudyCard() {
  return (
    <View style={styles.cardFace}>
      <Text style={styles.word}>Done</Text>
      <Text style={styles.hint}>No cards are due in this deck.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardFace: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    backfaceVisibility: "hidden"
  },
  word: { fontSize: typography.word, lineHeight: 56, color: colors.textStrong, fontWeight: typography.weightBold, textAlign: "center" },
  hint: { color: colors.textMuted, marginTop: typography.bodyLarge, textAlign: "center", fontWeight: typography.weightRegular }
});
