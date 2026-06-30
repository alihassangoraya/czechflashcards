import type { Card } from "@czech-flashcards/shared";
import type { AddWordValues, CorrectionValues } from "../../appTypes";

export type PanelCardHandlers = {
  onStudySearchResult: (card: Card) => void;
  onToggleSaved: (cardId: string, showFeedback?: boolean) => void;
  onAddCardToDeck: (deckId: string, cardId: string) => void;
  onRemoveCardFromDeck: (deckId: string, cardId: string) => void;
  onSetDeckManagementCard: (card: Card | null) => void;
  onOpenCardEditor: (card?: Card | null) => void;
  onCloseCardEditor: () => void;
  onAddWord: (values: AddWordValues) => void;
  onDeleteWord: (cardId: string) => void;
  onSaveCorrection: (values: CorrectionValues) => void;
};
