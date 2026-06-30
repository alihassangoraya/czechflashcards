import React, { useMemo } from "react";
import { View } from "react-native";
import { SearchField } from "../components/SearchField";
import { SearchNoResults } from "../components/SearchNoResults";
import { SearchPrompt } from "../components/SearchPrompt";
import { SearchResultMeta } from "../components/SearchResultMeta";
import { SearchResultsList } from "../components/SearchResultsList";
import { searchCards } from "../models/searchCards";
import { searchPanelStyles as styles } from "./searchPanelStyles";
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
