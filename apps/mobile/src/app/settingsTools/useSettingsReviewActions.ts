import { markCardsDueNow } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import type { SettingsReviewContext } from "./settingsToolTypes";

export function useSettingsReviewActions({
  db,
  deck,
  setSettingsNotice,
  refresh,
  shuffleDueCards,
  clearShuffledDueQueue,
  forceDeckRefresh
}: SettingsReviewContext) {
  const { t } = useI18n();

  function shuffleDueCardsInDeck() {
    shuffleDueCards(setSettingsNotice);
    forceDeckRefresh();
  }

  async function reviewAllNow() {
    if (!db) return;
    const count = await markCardsDueNow(db, deck.map((card) => card.id));
    clearShuffledDueQueue();
    setSettingsNotice(count ? t("settings.notice.reviewDue", { count }) : t("settings.notice.noCards"));
    await refresh(db);
  }

  return { shuffleDueCardsInDeck, reviewAllNow };
}
