import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { spacing } from "../../theme/design";
import { SearchField } from "./components/SearchField";
import { SearchNoResults } from "./components/SearchNoResults";
import { SearchPrompt } from "./components/SearchPrompt";
import { SearchResultMeta } from "./components/SearchResultMeta";
import { SearchResultsList } from "./components/SearchResultsList";
import { searchCards } from "./searchCards";

type Props = {
  cards: Card[];
  query: string;
  meaningLanguage: MeaningLanguage;
  savedCardIds: ReadonlySet<string>;
  onQueryChange: (value: string) => void;
  onStudy: (card: Card) => void;
  onToggleSaved: (card: Card) => void;
  onEdit: (card: Card) => void;
};

export function SearchPanel({ cards, query, meaningLanguage, savedCardIds, onQueryChange, onStudy, onToggleSaved, onEdit }: Props) {
  const results = useMemo(() => searchCards(cards, query), [cards, query]);
  const trimmedQuery = query.trim();

  return (
    <View style={styles.root}>
      <SearchField query={query} onQueryChange={onQueryChange} />

      {trimmedQuery ? (
        <SearchResultMeta count={results.length} />
      ) : (
        <SearchPrompt />
      )}

      {trimmedQuery && results.length === 0 && <SearchNoResults />}

      <SearchResultsList results={results} meaningLanguage={meaningLanguage} savedCardIds={savedCardIds} onStudy={onStudy} onToggleSaved={onToggleSaved} onEdit={onEdit} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.xl }
});
