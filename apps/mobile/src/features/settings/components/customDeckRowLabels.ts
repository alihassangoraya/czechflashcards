import type { CustomDeck } from "../../../database";
import type { I18nContextValue } from "../../../i18n/i18nContext";

export function buildCustomDeckRowLabels(t: I18nContextValue["t"], deck: CustomDeck) {
  return {
    cancelEdit: t("settings.cancelDeckEdit", { deck: deck.name }),
    deleteDeck: t("settings.deleteDeck", { deck: deck.name }),
    deleteQuestion: t("settings.deleteQuestion"),
    keepDeck: t("settings.keepDeck", { deck: deck.name }),
    renameDeck: t("settings.renameDeck", { deck: deck.name }),
    saveDeck: t("settings.saveDeck", { deck: deck.name })
  };
}
