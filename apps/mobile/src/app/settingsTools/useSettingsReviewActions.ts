import { markCardsDueNow } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import type { SettingsReviewContext } from "./settingsToolTypes";

export function useSettingsReviewActions({
  db,
  deck,
  showActionNotice,
  refresh,
  shuffleDueCards,
  clearShuffledDueQueue,
  forceDeckRefresh
}: SettingsReviewContext) {
  const { t } = useI18n();

  function shuffleDueCardsInDeck() {
    const hasDueCards = shuffleDueCards(showActionNotice);
    forceDeckRefresh();
    return hasDueCards;
  }

  async function reviewAllNow() {
    if (!db) return false;
    const count = await markCardsDueNow(db, deck.map((card) => card.id));
    clearShuffledDueQueue();
    showActionNotice(count ? t("settings.notice.reviewDue", { count }) : t("settings.notice.noCards"));
    await refresh(db);
    return count > 0;
  }

  return { shuffleDueCardsInDeck, reviewAllNow };
}
