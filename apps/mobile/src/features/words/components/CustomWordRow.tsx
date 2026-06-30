import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { customCardDeckLabel } from "../wordDecks";
import { CustomWordActions } from "./CustomWordActions";
import { DeleteWordWarning } from "./DeleteWordWarning";

type Props = {
  card: Card;
  decks: CustomDeck[];
  deleting: boolean;
  onRequestDelete: (cardId: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (cardId: string) => void;
  onEdit: (card: Card) => void;
};

export function CustomWordRow({ card, decks, deleting, onRequestDelete, onCancelDelete, onConfirmDelete, onEdit }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
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
        <CustomWordActions deleting={deleting} word={card.cz} onEdit={() => onEdit(card)} onRequestDelete={() => onRequestDelete(card.id)} />
      </View>
      {deleting && <DeleteWordWarning onCancel={onCancelDelete} onConfirm={() => onConfirmDelete(card.id)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.smd },
  row: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.md },
  accent: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  copy: { flex: 1, gap: spacing.xs },
  titleRow: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  word: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  deckPill: { maxWidth: size.cardHeight / 2, borderRadius: radius.card, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  deckText: { color: colors.textSoft, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  meaning: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
