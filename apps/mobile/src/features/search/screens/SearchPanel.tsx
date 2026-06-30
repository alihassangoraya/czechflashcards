import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import { SearchField } from "../components/SearchField";
import { SearchNoResults } from "../components/SearchNoResults";
import { SearchPrompt } from "../components/SearchPrompt";
import { SearchResultMeta } from "../components/SearchResultMeta";
import { SearchResultsList } from "../components/SearchResultsList";
import { searchCards } from "../searchCards";
import type { SearchPanelProps } from "./searchPanelTypes";

export function SearchPanel({ cards, query, meaningLanguage, savedCardIds, onQueryChange, onStudy, onToggleSaved, onManageDecks, onEdit }: SearchPanelProps) {
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

      <SearchResultsList results={results} meaningLanguage={meaningLanguage} savedCardIds={savedCardIds} onStudy={onStudy} onToggleSaved={onToggleSaved} onManageDecks={onManageDecks} onEdit={onEdit} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.xl }
});
