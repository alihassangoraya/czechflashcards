import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../database";
import type { Panel } from "./appTypes";
import { useCardEditor } from "./useCardEditor";
import { useCustomWordActions } from "./useCustomWordActions";
import { useDeckMembershipActions } from "./useDeckMembershipActions";
import { useSavedCardActions } from "./useSavedCardActions";

type Props = {
  db: AppDatabase | null;
  cards: Card[];
  current: Card | null;
  panel: Panel | null;
  savedCardIds: Set<string>;
  setSavedCardIds: (savedCardIds: Set<string> | ((previous: Set<string>) => Set<string>)) => void;
  setDeckMemberships: (deckMemberships: Record<string, string[]> | ((previous: Record<string, string[]>) => Record<string, string[]>)) => void;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  forceCard: (cardId: string, reveal?: boolean) => void;
  showToast: (message: string) => void;
};

export function useCardManagement({ db, cards, current, panel, savedCardIds, setSavedCardIds, setDeckMemberships, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard, showToast }: Props) {
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
