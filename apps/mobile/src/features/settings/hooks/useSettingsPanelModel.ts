import { useI18n } from "../../../i18n/I18nProvider";
import type { TranslationKey } from "../../../i18n/translations";
import { deckLabel } from "../models/settingsFormat";
import type { SettingsPanelProps } from "../types/settingsPanelTypes";

export function useSettingsPanelModel(settings: SettingsPanelProps["settings"]) {
  const { t } = useI18n();
  const customDeck = settings.customDecks.some((deck) => deck.id === settings.deckFilter);
  const activeDeckLabel = customDeck ? deckLabel(settings.deckFilter, settings.customDecks, t) : t(`deck.${settings.deckFilter}` as TranslationKey);

  return { activeDeckLabel };
}
