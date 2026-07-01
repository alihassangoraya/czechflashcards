import { exportBackup } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import { downloadJson } from "../../services/fileTransfer";
import { buildAccountExportPayload } from "./accountExportPayload";
import { buildDeckExportPayload } from "./deckExportPayload";
import type { SettingsToolContext } from "./settingsToolTypes";

export function useSettingsExportActions({ db, deck, settings, accountEmail, supabase, setSettingsNotice }: SettingsToolContext) {
  const { t } = useI18n();

  async function exportProgress() {
    if (!db) return;
    const ok = await downloadJson("czech-flashcards-progress.json", exportBackup(db));
    setSettingsNotice(ok ? t("settings.notice.progressExported") : t("settings.notice.exportWebOnly"));
  }

  async function exportCurrentDeck() {
    if (!settings) return;
    const ok = await downloadJson(`czech-${settings.examLevel}-${settings.deckFilter}-deck.json`, buildDeckExportPayload(deck, settings));
    setSettingsNotice(ok ? t("settings.notice.deckExported", { count: deck.length }) : t("settings.notice.deckExportWebOnly"));
  }

  async function exportAccountData() {
    const payload = await buildAccountExportPayload({ db, settings, accountEmail, supabase });
    const ok = await downloadJson("czech-flashcards-account-data.json", payload);
    setSettingsNotice(ok ? t("account.accountDataExported") : t("settings.notice.exportWebOnly"));
  }

  return { exportProgress, exportCurrentDeck, exportAccountData };
}
