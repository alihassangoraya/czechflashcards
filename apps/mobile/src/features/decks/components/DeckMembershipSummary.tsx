import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { DeckMembershipSummaryProps } from "./deckMembershipSummaryTypes";

export function DeckMembershipSummary({ card }: DeckMembershipSummaryProps) {
  return (
    <View style={styles.wordSummary}>
      <MaterialIcons name="library-add" size={size.iconMedium} color={colors.iconPrimary} />
      <View style={styles.wordCopy}>
        <Text style={styles.word}>{card.cz}</Text>
        <Text style={styles.meaning}>{card.en}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordSummary: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  wordCopy: { flex: 1, gap: spacing.xxs },
  word: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  meaning: { color: colors.textMuted, fontSize: typography.body, fontWeight: typography.weightRegular }
});
