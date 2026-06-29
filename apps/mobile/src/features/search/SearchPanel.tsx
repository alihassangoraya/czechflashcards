import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Speech from "../../speech";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { selectedMeaning } from "@czech-flashcards/shared";
import { colors, radius, size, spacing, typography } from "../../theme/design";

type Props = {
  cards: Card[];
  query: string;
  meaningLanguage: MeaningLanguage;
  savedCardIds: ReadonlySet<string>;
  onQueryChange: (value: string) => void;
  onStudy: (card: Card) => void;
  onToggleSaved: (card: Card) => void;
};

export function SearchPanel({ cards, query, meaningLanguage, savedCardIds, onQueryChange, onStudy, onToggleSaved }: Props) {
  const results = useMemo(() => searchCards(cards, query), [cards, query]);
  const trimmedQuery = query.trim();

  return (
    <View style={styles.root}>
      <View style={styles.searchField}>
        <MaterialIcons name="search" size={size.icon} color={colors.actionMuted} />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={onQueryChange}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search Czech, English, Hindi, or Urdu"
          placeholderTextColor={colors.textMuted}
          accessibilityLabel="Search vocabulary"
        />
        {Boolean(query) && (
          <Pressable style={styles.clearButton} onPress={() => onQueryChange("")} accessibilityRole="button" accessibilityLabel="Clear search">
            <MaterialIcons name="close" size={size.iconSmall} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {trimmedQuery ? (
        <View style={styles.resultMeta}>
          <Text style={styles.resultCount}>{results.length} {results.length === 1 ? "match" : "matches"}</Text>
          <Text style={styles.resultScope}>Across all vocabulary</Text>
        </View>
      ) : (
        <View style={styles.emptyPrompt}>
          <View style={styles.emptyPromptIcon}><MaterialIcons name="manage-search" size={size.iconMedium} color={colors.action} /></View>
          <View style={styles.emptyPromptCopy}>
            <Text style={styles.emptyPromptTitle}>Find a word</Text>
            <Text style={styles.emptyPromptText}>Search all 6,000+ cards in Czech, English, Hindi, or Urdu.</Text>
          </View>
        </View>
      )}

      {trimmedQuery && results.length === 0 && (
        <View style={styles.noResults}>
          <MaterialIcons name="search-off" size={size.iconMedium} color={colors.textMuted} />
          <Text style={styles.noResultsTitle}>No matching words</Text>
          <Text style={styles.noResultsText}>Try a shorter spelling or another language.</Text>
        </View>
      )}

      <View style={styles.results}>
        {results.map((card) => {
          const saved = savedCardIds.has(card.id);
          const meaning = selectedMeaning(card, meaningLanguage);
          return (
            <View key={card.id} style={styles.resultRow}>
              <Pressable style={styles.resultStudy} onPress={() => onStudy(card)} accessibilityRole="button" accessibilityLabel={`Study ${card.cz}`}>
                <View style={styles.resultHeading}>
                  <Text style={styles.resultWord}>{card.cz}</Text>
                  {card.grammar?.partOfSpeech && <Text style={styles.partOfSpeech}>{card.grammar.partOfSpeech}</Text>}
                </View>
                <Text style={styles.resultEnglish}>{card.en}</Text>
                <Text style={[styles.resultMeaning, meaningLanguage === "ur" && styles.rtl]}>{meaning}</Text>
              </Pressable>
              <View style={styles.resultActions}>
                <Pressable style={styles.resultAction} onPress={() => Speech.speak(card.cz, { language: "cs-CZ", rate: 0.86 })} accessibilityRole="button" accessibilityLabel={`Play ${card.cz}`}>
                  <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
                </Pressable>
                <Pressable style={[styles.resultAction, saved && styles.savedAction]} onPress={() => onToggleSaved(card)} accessibilityRole="button" accessibilityLabel={saved ? `Remove ${card.cz} from My list` : `Save ${card.cz} to My list`}>
                  <MaterialIcons name={saved ? "bookmark" : "bookmark-border"} size={size.iconSmall} color={saved ? colors.onPrimary : colors.action} />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function searchCards(cards: Card[], query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];
  return cards
    .map((card) => ({ card, score: matchScore(card, normalized) }))
    .filter((result) => result.score < Number.POSITIVE_INFINITY)
    .sort((left, right) => left.score - right.score || left.card.cz.localeCompare(right.card.cz, "cs"))
    .slice(0, 40)
    .map((result) => result.card);
}

function matchScore(card: Card, query: string) {
  const fields = [card.cz, card.en, card.hi, card.ur, card.pronunciation || "", card.synonyms || "", card.antonyms || ""];
  const exact = fields.findIndex((value) => value.toLocaleLowerCase() === query);
  if (exact >= 0) return exact;
  const prefix = fields.findIndex((value) => value.toLocaleLowerCase().startsWith(query));
  if (prefix >= 0) return prefix + 10;
  const contains = fields.findIndex((value) => value.toLocaleLowerCase().includes(query));
  return contains >= 0 ? contains + 20 : Number.POSITIVE_INFINITY;
}

const styles = StyleSheet.create({
  root: { gap: spacing.xl },
  searchField: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  input: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, paddingVertical: spacing.lg },
  clearButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center" },
  resultMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  resultCount: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  resultScope: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  emptyPrompt: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  emptyPromptIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.actionSoft },
  emptyPromptCopy: { flex: 1, gap: spacing.xxs },
  emptyPromptTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  emptyPromptText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  noResults: { alignItems: "center", gap: spacing.smd, paddingVertical: spacing.hero },
  noResultsTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  noResultsText: { color: colors.textMuted, fontSize: typography.bodySmall, textAlign: "center" },
  results: { gap: spacing.smd },
  resultRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  resultStudy: { flex: 1, gap: spacing.xxs },
  resultHeading: { flexDirection: "row", alignItems: "center", gap: spacing.smd, flexWrap: "wrap" },
  resultWord: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  partOfSpeech: { borderRadius: radius.sm, backgroundColor: colors.primarySoft, color: colors.primaryDeep, fontSize: typography.micro, fontWeight: typography.weightSemibold, paddingHorizontal: spacing.smd, paddingVertical: spacing.xxs },
  resultEnglish: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  resultMeaning: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  resultActions: { gap: spacing.smd },
  resultAction: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  savedAction: { borderColor: colors.primaryDeep, backgroundColor: colors.primaryDeep }
});
