import type { Card } from "@czech-flashcards/shared";
import type { CorrectionValues } from "../appTypes";
import { useI18n } from "../../i18n/I18nProvider";
import type { CardEditorProps } from "./cardEditorTypes";
import { saveCardEditorCorrection } from "./cardEditorSaveCorrection";
import { useCardEditSession } from "./useCardEditSession";
import { openSearchResultForStudy } from "./cardStudyNavigation";

export function useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard, showToast }: CardEditorProps) {
  const { t } = useI18n();
  const { clearEditingCard, editingCard, startEditingCard } = useCardEditSession();

  async function saveCorrection(values: CorrectionValues) {
    const card = await saveCardEditorCorrection({ db, editingCard, values, clearEditingCard, forceCard, setPanel, refresh });
    if (card) showToast(t("toast.correctionSaved", { word: card.cz }));
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
