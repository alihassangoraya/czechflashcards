import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import { colors, radius, shadow, spacing } from "../../../theme/design";
import { SearchResultActions } from "./SearchResultActions";
import { SearchResultSummary } from "./SearchResultSummary";

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
      <SearchResultActions card={card} saved={saved} onToggleSaved={onToggleSaved} onManageDecks={onManageDecks} onEdit={onEdit} />
      <SearchResultSummary card={card} meaningLanguage={meaningLanguage} onStudy={onStudy} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.md,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.lgPlus,
    ...shadow.soft
  }
});
