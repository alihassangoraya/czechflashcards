import React from "react";
import { View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { SearchResultActions } from "./SearchResultActions";
import { SearchResultSummary } from "./SearchResultSummary";
import { searchResultRowStyles as styles } from "./searchResultRowStyles";

type Props = {
  card: Card;
  meaningLanguage: MeaningLanguage;
  saved: boolean;
  onStudy: (card: Card) => void;
  onToggleSaved: (card: Card) => void;
  onManageDecks: (card: Card) => void;
  onEdit: (card: Card) => void;
};

export function SearchResultRow({ card, meaningLanguage, saved, onStudy, onToggleSaved, onManageDecks, onEdit }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.actions}>
        <SearchResultActions card={card} saved={saved} onToggleSaved={onToggleSaved} onManageDecks={onManageDecks} onEdit={onEdit} />
      </View>
      <SearchResultSummary card={card} meaningLanguage={meaningLanguage} onStudy={onStudy} />
    </View>
  );
}
