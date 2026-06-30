import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../database";
import type { Panel } from "../appTypes";
import type { CorrectionValues } from "../appShellTypes";
import { useCardEditSession } from "./useCardEditSession";
import { saveEditedCard } from "./cardEditorPersistence";
import { openSearchResultForStudy } from "./cardStudyNavigation";

type Props = {
  db: AppDatabase | null;
  current: Card | null;
  panel: Panel | null;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  forceCard: (cardId: string, reveal?: boolean) => void;
};

export function useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard }: Props) {
  const { clearEditingCard, editingCard, startEditingCard } = useCardEditSession();

  async function saveCorrection(values: CorrectionValues) {
    if (!db || !editingCard) return;
    const card = await saveEditedCard({ db, editingCard, values });
    forceCard(card.id, true);
    setPanel(clearEditingCard());
    await refresh(db);
  }

  function openCardEditor(card = current) {
    if (!card) return;
    startEditingCard(card, panel === "add" ? "add" : null);
    setPanel("edit");
  }

  function closeCardEditor() {
    setPanel(clearEditingCard());
  }

  function studySearchResult(card: Card) {
    openSearchResultForStudy({ card, forceCard, setCurrent, setRevealed, setSessionReviews, setPanel });
  }

  return { editingCard, saveCorrection, openCardEditor, closeCardEditor, studySearchResult };
}
