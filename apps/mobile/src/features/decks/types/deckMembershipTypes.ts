import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck, DeckMemberships } from "../../../database";

export type DeckMembershipPanelProps = {
  card: Card | null;
  decks: CustomDeck[];
  deckMemberships: DeckMemberships;
  onAddToDeck: (deckId: string, cardId: string) => void;
  onRemoveFromDeck: (deckId: string, cardId: string) => void;
  onOpenSettings: () => void;
};
