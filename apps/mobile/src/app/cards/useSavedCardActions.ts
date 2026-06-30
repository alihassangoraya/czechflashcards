import { useRef } from "react";
import type { Card } from "@czech-flashcards/shared";
import { loadSavedCardIds, setCardSaved, type AppDatabase } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";

type Props = {
  db: AppDatabase | null;
  cards: Card[];
  savedCardIds: Set<string>;
  setSavedCardIds: (savedCardIds: Set<string> | ((previous: Set<string>) => Set<string>)) => void;
  showToast: (message: string) => void;
};

export function useSavedCardActions({ db, cards, savedCardIds, setSavedCardIds, showToast }: Props) {
  const { t } = useI18n();
  const savingCardIds = useRef(new Set<string>());

  async function toggleSavedCard(cardId: string, showFeedback = false) {
    if (!db || savingCardIds.current.has(cardId)) return;

    savingCardIds.current.add(cardId);
    const nextSaved = !savedCardIds.has(cardId);
    const card = cards.find((item) => item.id === cardId);
    setSavedCardIds((previous) => {
      const next = new Set(previous);
      if (nextSaved) next.add(cardId);
      else next.delete(cardId);
      return next;
    });

    const word = card?.cz || t("toast.cardFallback");
    if (showFeedback) showToast(nextSaved ? t("toast.starredAdded", { word }) : t("toast.starredRemoved", { word }));

    try {
      await setCardSaved(db, cardId, nextSaved);
    } catch {
      setSavedCardIds(await loadSavedCardIds(db));
      if (showFeedback) showToast(t("toast.starredFailed"));
    } finally {
      savingCardIds.current.delete(cardId);
    }
  }

  return { toggleSavedCard };
}
