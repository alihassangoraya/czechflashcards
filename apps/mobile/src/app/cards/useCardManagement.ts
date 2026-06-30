import type { CardManagementProps } from "./cardManagementTypes";
import { useCardEditor } from "./useCardEditor";
import { useCustomWordActions } from "./useCustomWordActions";
import { useDeckMembershipActions } from "./useDeckMembershipActions";
import { useSavedCardActions } from "./useSavedCardActions";

export function useCardManagement({ db, cards, current, panel, savedCardIds, setSavedCardIds, setDeckMemberships, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard, showToast }: CardManagementProps) {
  const editor = useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard });
  const customWords = useCustomWordActions({ db, refresh });
  const savedCards = useSavedCardActions({ db, cards, savedCardIds, setSavedCardIds, showToast });
  const deckMembership = useDeckMembershipActions({ db, cards, setDeckMemberships, setPanel, showToast });

  return {
    editingCard: editor.editingCard,
    deckManagementCard: deckMembership.deckManagementCard,
    addWord: customWords.addWord,
    deleteWord: customWords.deleteWord,
    toggleSavedCard: savedCards.toggleSavedCard,
    addCardToDeck: deckMembership.addCardToDeck,
    removeCardFromDeck: deckMembership.removeCardFromDeck,
    setDeckManagementCard: deckMembership.setDeckManagementCard,
    saveCorrection: editor.saveCorrection,
    openCardEditor: editor.openCardEditor,
    closeCardEditor: editor.closeCardEditor,
    studySearchResult: editor.studySearchResult
  };
}

export type CardManagement = ReturnType<typeof useCardManagement>;
