import type { AppShellHandlerInput } from "./handlerInput";

type Input = Pick<AppShellHandlerInput, "cardManagement">;

export function buildCardHandlers({ cardManagement }: Input) {
  return {
    onToggleSaved: (cardId: string, showFeedback?: boolean) => { void cardManagement.toggleSavedCard(cardId, showFeedback); },
    onAddCardToDeck: (deckId: string, cardId: string) => { void cardManagement.addCardToDeck(deckId, cardId); },
    onRemoveCardFromDeck: (deckId: string, cardId: string) => { void cardManagement.removeCardFromDeck(deckId, cardId); },
    onSetDeckManagementCard: cardManagement.setDeckManagementCard,
    onOpenCardEditor: cardManagement.openCardEditor,
    onCloseCardEditor: cardManagement.closeCardEditor,
    onAddWord: (values: Parameters<AppShellHandlerInput["cardManagement"]["addWord"]>[0]) => { void cardManagement.addWord(values); },
    onDeleteWord: (cardId: string) => { void cardManagement.deleteWord(cardId); },
    onSaveCorrection: (values: Parameters<AppShellHandlerInput["cardManagement"]["saveCorrection"]>[0]) => { void cardManagement.saveCorrection(values); }
  };
}
