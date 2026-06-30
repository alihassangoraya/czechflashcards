import { useI18n } from "../../i18n/I18nProvider";
import { pickTextFile } from "../../services/fileTransfer";
import { restoreSettingsBackup } from "./settingsBackupRestore";
import { importCsvTextToSettingsDeck } from "./settingsCsvImport";
import type { SettingsImportContext } from "./settingsToolTypes";

export function useSettingsImportActions({ db, settings, setSettingsState, setSettingsNotice, refresh }: SettingsImportContext) {
  const { t } = useI18n();

  function importCsv() {
    pickTextFile(".csv,text/csv", async (text) => {
      if (!db) return;
      const result = await importCsvTextToSettingsDeck(db, text, settings);
      if (!result) {
        setSettingsNotice(t("settings.notice.csvInvalid"));
        return;
      }
      setSettingsNotice(result.deckName ? t("settings.notice.csvImportedDeck", { count: result.count, deck: result.deckName }) : t("settings.notice.csvImported", { count: result.count }));
      await refresh(db);
    }, () => setSettingsNotice(t("settings.notice.csvWebOnly")));
  }

  function restoreJson() {
    pickTextFile(".json,application/json", async (text) => {
      if (!db) return;
      try {
        const nextSettings = await restoreSettingsBackup(db, text);
        setSettingsState(nextSettings);
        setSettingsNotice(t("settings.notice.restoreSuccess"));
        await refresh(db);
      } catch {
        setSettingsNotice(t("settings.notice.restoreFailed"));
      }
    }, () => setSettingsNotice(t("settings.notice.restoreWebOnly")));
  }

  return { importCsv, restoreJson };
}
