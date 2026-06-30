import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import { DeckMembershipEmpty } from "../components/DeckMembershipEmpty";
import { DeckMembershipList } from "../components/DeckMembershipList";
import { DeckMembershipSummary } from "../components/DeckMembershipSummary";
import type { DeckMembershipPanelProps } from "../deckMembershipTypes";

export function DeckMembershipPanel({ card, decks, deckMemberships, onAddToDeck, onRemoveFromDeck, onOpenSettings }: DeckMembershipPanelProps) {
  if (!card) return null;

  return (
    <View style={styles.root}>
      <DeckMembershipSummary card={card} />
      {decks.length === 0 ? (
        <DeckMembershipEmpty onOpenSettings={onOpenSettings} />
      ) : (
        <DeckMembershipList card={card} decks={decks} deckMemberships={deckMemberships} onAddToDeck={onAddToDeck} onRemoveFromDeck={onRemoveFromDeck} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.xlPlus }
});
