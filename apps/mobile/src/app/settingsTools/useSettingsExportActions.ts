import { exportBackup } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import { downloadJson } from "../../services/fileTransfer";
import { buildDeckExportPayload } from "./deckExportPayload";
import type { SettingsToolContext } from "./settingsToolTypes";

export function useSettingsExportActions({ db, deck, settings, setSettingsNotice }: SettingsToolContext) {
  const { t } = useI18n();

  async function exportProgress() {
    if (!db) return;
    const ok = downloadJson("czech-flashcards-progress.json", exportBackup(db));
    setSettingsNotice(ok ? t("settings.notice.progressExported") : t("settings.notice.exportWebOnly"));
  }

  function exportCurrentDeck() {
    if (!settings) return;
    const ok = downloadJson(`czech-${settings.examLevel}-${settings.deckFilter}-deck.json`, buildDeckExportPayload(deck, settings));
    setSettingsNotice(ok ? t("settings.notice.deckExported", { count: deck.length }) : t("settings.notice.deckExportWebOnly"));
  }

  return { exportProgress, exportCurrentDeck };
}
