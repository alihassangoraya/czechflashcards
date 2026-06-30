import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../../database";
import { spacing } from "../../../theme/design";
import { DeckMembershipRow } from "./DeckMembershipRow";

type Props = {
  card: Card;
  decks: CustomDeck[];
  deckMemberships: Record<string, string[]>;
  onAddToDeck: (deckId: string, cardId: string) => void;
  onRemoveFromDeck: (deckId: string, cardId: string) => void;
};

export function DeckMembershipList({ card, decks, deckMemberships, onAddToDeck, onRemoveFromDeck }: Props) {
  return (
    <View style={styles.deckList}>
      {decks.map((deck) => {
        const inDeck = new Set(deckMemberships[deck.id] || []).has(card.id) || card.tags.includes(deck.id);
        const onPress = () => inDeck ? onRemoveFromDeck(deck.id, card.id) : onAddToDeck(deck.id, card.id);
        return <DeckMembershipRow key={deck.id} deck={deck} inDeck={inDeck} onPress={onPress} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  deckList: { gap: spacing.smd }
});
