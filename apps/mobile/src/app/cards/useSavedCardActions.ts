import { useRef } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { savedCardFailureMessage, savedCardSuccessMessage } from "./savedCardFeedback";
import { persistSavedCardState, reloadSavedCardIds } from "./savedCardPersistence";
import { updateSavedCardIds } from "./savedCardState";
import type { SavedCardActionProps } from "./savedCardTypes";

export function useSavedCardActions({ db, cards, savedCardIds, setSavedCardIds, showToast }: SavedCardActionProps) {
  const { t } = useI18n();
  const savingCardIds = useRef(new Set<string>());

  async function toggleSavedCard(cardId: string, showFeedback = false) {
    if (!db || savingCardIds.current.has(cardId)) return;

    savingCardIds.current.add(cardId);
    const nextSaved = !savedCardIds.has(cardId);
    const card = cards.find((item) => item.id === cardId);
    setSavedCardIds((previous) => updateSavedCardIds(previous, cardId, nextSaved));

    if (showFeedback) showToast(savedCardSuccessMessage(card, nextSaved, t));

    try {
      await persistSavedCardState(db, cardId, nextSaved);
    } catch {
      setSavedCardIds(await reloadSavedCardIds(db));
      if (showFeedback) showToast(savedCardFailureMessage(t));
    } finally {
      savingCardIds.current.delete(cardId);
    }
  }

  return { toggleSavedCard };
}
