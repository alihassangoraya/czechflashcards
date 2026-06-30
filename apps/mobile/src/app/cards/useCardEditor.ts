import type { Card } from "@czech-flashcards/shared";
import type { CorrectionValues } from "../appShellTypes";
import type { CardEditorProps } from "./cardEditorTypes";
import { saveCardEditorCorrection } from "./cardEditorSaveCorrection";
import { useCardEditSession } from "./useCardEditSession";
import { openSearchResultForStudy } from "./cardStudyNavigation";

export function useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard }: CardEditorProps) {
  const { clearEditingCard, editingCard, startEditingCard } = useCardEditSession();

  async function saveCorrection(values: CorrectionValues) {
    await saveCardEditorCorrection({ db, editingCard, values, clearEditingCard, forceCard, setPanel, refresh });
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
