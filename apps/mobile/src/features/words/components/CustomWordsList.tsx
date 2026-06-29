import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { customCardDeckLabel } from "../wordDecks";

type Props = {
  cards: Card[];
  decks: CustomDeck[];
  deleteCandidateId: string | null;
  onRequestDelete: (cardId: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (cardId: string) => void;
  onEdit: (card: Card) => void;
};

export function CustomWordsList({ cards, decks, deleteCandidateId, onRequestDelete, onCancelDelete, onConfirmDelete, onEdit }: Props) {
  if (!cards.length) return null;

  return (
    <View style={styles.savedSection}>
      <View style={styles.savedHeader}>
        <View style={styles.savedHeaderCopy}>
          <Text style={styles.savedTitle}>Your added words</Text>
          <Text style={styles.savedSubtitle}>Edit details or remove words you added yourself.</Text>
        </View>
        <View style={styles.savedCountPill}>
          <Text style={styles.savedCount}>{cards.length}</Text>
        </View>
      </View>
      {cards.slice(0, 12).map((card) => (
        <View key={card.id} style={styles.savedCard}>
          <View style={styles.savedRow}>
            <View style={styles.savedAccent}>
              <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.primaryDeep} />
            </View>
            <View style={styles.savedCopy}>
              <View style={styles.savedTitleRow}>
                <Text style={styles.savedWord} numberOfLines={1}>{card.cz}</Text>
                <View style={styles.savedDeckPill}>
                  <Text style={styles.savedDeckText} numberOfLines={1}>{customCardDeckLabel(card, decks)}</Text>
                </View>
              </View>
              <Text style={styles.savedMeaning} numberOfLines={2}>{card.en}</Text>
            </View>
            <View style={styles.savedActions}>
              <Pressable
                style={styles.editButton}
                onPress={() => onEdit(card)}
                accessibilityRole="button"
                accessibilityLabel={`Edit ${card.cz}`}
              >
                <MaterialIcons name="edit" size={size.iconSmall} color={colors.action} />
              </Pressable>
              <Pressable
                style={[styles.deleteButton, deleteCandidateId === card.id && styles.deleteButtonActive]}
                onPress={() => onRequestDelete(card.id)}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${card.cz}`}
              >
                <MaterialIcons name="delete-outline" size={size.iconSmall} color={colors.danger} />
              </Pressable>
            </View>
          </View>
          {deleteCandidateId === card.id && (
            <View style={styles.deleteWarning}>
              <View style={styles.deleteWarningCopy}>
                <Text style={styles.deleteWarningTitle}>Delete this word?</Text>
                <Text style={styles.deleteWarningText}>This removes it from your custom words and study queue.</Text>
              </View>
              <View style={styles.deleteWarningActions}>
                <Pressable style={styles.cancelDeleteButton} onPress={onCancelDelete} accessibilityRole="button">
                  <Text style={styles.cancelDeleteText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.confirmDeleteButton} onPress={() => onConfirmDelete(card.id)} accessibilityRole="button">
                  <Text style={styles.confirmDeleteText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  savedSection: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xlPlus },
  savedHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg },
  savedHeaderCopy: { flex: 1, gap: spacing.xxs },
  savedTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  savedSubtitle: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  savedCountPill: { minWidth: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.primarySoft, paddingHorizontal: spacing.smd },
  savedCount: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  savedCard: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.smd },
  savedRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.md },
  savedAccent: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  savedCopy: { flex: 1, gap: spacing.xs },
  savedTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  savedWord: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  savedDeckPill: { maxWidth: size.cardHeight / 2, borderRadius: radius.card, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  savedDeckText: { color: colors.textSoft, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  savedMeaning: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  savedActions: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  editButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.actionSoft },
  deleteButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.dangerSoft },
  deleteButtonActive: { borderWidth: spacing.hairline, borderColor: colors.danger },
  deleteWarning: { gap: spacing.md, borderRadius: radius.sm, backgroundColor: colors.dangerSoft, padding: spacing.lg },
  deleteWarningCopy: { gap: spacing.xxs },
  deleteWarningTitle: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  deleteWarningText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  deleteWarningActions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.smd },
  cancelDeleteButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.surface, paddingHorizontal: spacing.lg },
  cancelDeleteText: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  confirmDeleteButton: { minHeight: size.cardAction, justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.danger, paddingHorizontal: spacing.lg },
  confirmDeleteText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
