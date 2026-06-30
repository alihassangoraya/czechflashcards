import { markCardsDueNow } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import type { SettingsToolContext } from "./settingsToolTypes";

type Props = Pick<SettingsToolContext, "db" | "deck" | "setSettingsNotice" | "refresh"> & {
  shuffleDueCards: (onNotice: (message: string) => void) => void;
  clearShuffledDueQueue: () => void;
  forceDeckRefresh: () => void;
};

export function useSettingsReviewActions({
  db,
  deck,
  setSettingsNotice,
  refresh,
  shuffleDueCards,
  clearShuffledDueQueue,
  forceDeckRefresh
}: Props) {
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
