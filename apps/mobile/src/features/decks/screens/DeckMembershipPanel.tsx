import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  card: Card | null;
  decks: CustomDeck[];
  deckMemberships: Record<string, string[]>;
  onAddToDeck: (deckId: string, cardId: string) => void;
  onRemoveFromDeck: (deckId: string, cardId: string) => void;
  onOpenSettings: () => void;
};

export function DeckMembershipPanel({ card, decks, deckMemberships, onAddToDeck, onRemoveFromDeck, onOpenSettings }: Props) {
  const { t } = useI18n();
  if (!card) return null;

  return (
    <View style={styles.root}>
      <View style={styles.wordSummary}>
        <MaterialIcons name="library-add" size={size.iconMedium} color={colors.primaryDeep} />
        <View style={styles.wordCopy}>
          <Text style={styles.word}>{card.cz}</Text>
          <Text style={styles.meaning}>{card.en}</Text>
        </View>
      </View>

      {decks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>{t("deckMembership.emptyTitle")}</Text>
          <Text style={styles.emptyCopy}>{t("deckMembership.emptyCopy")}</Text>
          <Pressable style={styles.primaryButton} onPress={onOpenSettings} accessibilityRole="button">
            <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
            <Text style={styles.primaryText}>{t("deckMembership.createDeck")}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.deckList}>
          {decks.map((deck) => {
            const inDeck = new Set(deckMemberships[deck.id] || []).has(card.id) || card.tags.includes(deck.id);
            return (
              <Pressable
                key={deck.id}
                style={[styles.deckRow, inDeck && styles.deckRowActive]}
                onPress={() => inDeck ? onRemoveFromDeck(deck.id, card.id) : onAddToDeck(deck.id, card.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: inDeck }}
              >
                <View style={[styles.deckIcon, inDeck && styles.deckIconActive]}>
                  <MaterialIcons name="folder" size={size.icon} color={inDeck ? colors.onPrimary : colors.primaryDeep} />
                </View>
                <View style={styles.deckCopy}>
                  <Text style={styles.deckName}>{deck.name}</Text>
                  <Text style={styles.deckMeta}>{inDeck ? t("deckMembership.inDeck") : t("deckMembership.tapToAdd")}</Text>
                </View>
                <MaterialIcons name={inDeck ? "check-circle" : "add-circle-outline"} size={size.iconMedium} color={inDeck ? colors.success : colors.action} />
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.xlPlus },
  wordSummary: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  wordCopy: { flex: 1, gap: spacing.xxs },
  word: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  meaning: { color: colors.textMuted, fontSize: typography.body, fontWeight: typography.weightRegular },
  emptyState: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  emptyTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  emptyCopy: { color: colors.textMuted, fontSize: typography.body, lineHeight: typography.screenTitle },
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  primaryText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold },
  deckList: { gap: spacing.smd },
  deckRow: { minHeight: size.quizOptionHeight, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  deckRowActive: { borderColor: colors.success, backgroundColor: colors.mintSoft },
  deckIcon: { width: size.categoryIcon, height: size.categoryIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.surfaceMuted },
  deckIconActive: { backgroundColor: colors.success },
  deckCopy: { flex: 1, gap: spacing.xxs },
  deckName: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  deckMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular }
});
