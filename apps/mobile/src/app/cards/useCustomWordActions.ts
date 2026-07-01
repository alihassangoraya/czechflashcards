import type { AddWordValues } from "../appTypes";
import { useI18n } from "../../i18n/I18nProvider";
import { removeCustomWord, saveCustomWord } from "./customWordPersistence";
import type { CustomWordActionProps } from "./customWordTypes";
import { isValidCustomWord } from "./customWordValidation";

export function useCustomWordActions({ db, cards, refresh, showToast }: CustomWordActionProps) {
  const { t } = useI18n();
  async function addWord(values: AddWordValues) {
    if (!db) return;
    if (!isValidCustomWord(values)) return showToast(t("words.validationRequired"));
    await saveCustomWord(db, values);
    await refresh(db);
    showToast(t("toast.wordAdded", { word: values.cz.trim() }));
  }

  async function deleteWord(cardId: string) {
    if (!db) return;
    const word = cards.find((card) => card.id === cardId)?.cz || t("toast.cardFallback");
    await removeCustomWord(db, cardId);
    await refresh(db);
    showToast(t("toast.wordDeleted", { word }));
  }

  return { addWord, deleteWord };
}
