import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { speak } from "../../../services/speech";
import { spacing } from "../../../theme/design";
import { SearchActionButton } from "./SearchActionButton";

type Props = {
  card: Card;
  saved: boolean;
  onToggleSaved: (card: Card) => void;
  onManageDecks: (card: Card) => void;
  onEdit: (card: Card) => void;
};

export function SearchResultActions({ card, saved, onToggleSaved, onManageDecks, onEdit }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.actions}>
      {card.source === "custom" && (
        <SearchActionButton icon="edit" label={t("search.editWord", { word: card.cz })} onPress={() => onEdit(card)} />
      )}
      <SearchActionButton icon="volume-up" label={t("search.playWord", { word: card.cz })} onPress={() => speak(card.cz, { language: "cs-CZ", rate: 0.86 })} />
      <SearchActionButton icon="folder" label={t("search.addToDeck", { word: card.cz })} onPress={() => onManageDecks(card)} />
      <SearchActionButton
        icon={saved ? "star" : "star-border"}
        label={saved ? t("search.removeFromMyList", { word: card.cz }) : t("search.addToMyList", { word: card.cz })}
        onPress={() => onToggleSaved(card)}
        saved={saved}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { gap: spacing.smd }
});
