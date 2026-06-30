import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck } from "../../database";

export type DeckMembershipPanelProps = {
  card: Card | null;
  decks: CustomDeck[];
  deckMemberships: Record<string, string[]>;
  onAddToDeck: (deckId: string, cardId: string) => void;
  onRemoveFromDeck: (deckId: string, cardId: string) => void;
  onOpenSettings: () => void;
};
