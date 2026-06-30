import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { customCardDeckLabel } from "../wordDecks";

type Props = {
  card: Card;
  decks: CustomDeck[];
};

export function CustomWordSummary({ card, decks }: Props) {
  return (
    <>
      <View style={styles.accent}>
        <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.primaryDeep} />
      </View>
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.word} numberOfLines={1}>{card.cz}</Text>
          <View style={styles.deckPill}>
            <Text style={styles.deckText} numberOfLines={1}>{customCardDeckLabel(card, decks)}</Text>
          </View>
        </View>
        <Text style={styles.meaning} numberOfLines={2}>{card.en}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accent: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  copy: { flex: 1, gap: spacing.xs },
  titleRow: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  word: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  deckPill: { maxWidth: size.cardHeight / 2, borderRadius: radius.card, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  deckText: { color: colors.textSoft, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  meaning: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
