import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { spacing } from "../../../theme/design";
import { SearchResultRow } from "./SearchResultRow";

type Props = {
  results: Card[];
  meaningLanguage: MeaningLanguage;
  savedCardIds: ReadonlySet<string>;
  onStudy: (card: Card) => void;
  onToggleSaved: (card: Card) => void;
  onManageDecks: (card: Card) => void;
  onEdit: (card: Card) => void;
};

export function SearchResultsList({ results, meaningLanguage, savedCardIds, onStudy, onToggleSaved, onManageDecks, onEdit }: Props) {
  return (
    <View style={styles.results}>
      {results.map((card) => (
        <SearchResultRow
          key={card.id}
          card={card}
          meaningLanguage={meaningLanguage}
          saved={savedCardIds.has(card.id)}
          onStudy={onStudy}
          onToggleSaved={onToggleSaved}
          onManageDecks={onManageDecks}
          onEdit={onEdit}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  results: { gap: spacing.smd }
});
