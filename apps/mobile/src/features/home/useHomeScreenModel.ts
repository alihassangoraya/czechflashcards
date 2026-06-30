import { useI18n } from "../../i18n/I18nProvider";
import { buildHomeScreenModel } from "./homeScreenModel";
import type { HomeScreenProps } from "./homeScreenTypes";

export function useHomeScreenModel(props: HomeScreenProps) {
  const { t } = useI18n();

  return buildHomeScreenModel({
    deck: props.deck,
    allCards: props.allCards,
    states: props.states,
    settings: props.settings,
    savedCount: props.savedCount,
    customCount: props.customCount,
    dailyProgress: props.dailyProgress,
    translate: t
  });
}
