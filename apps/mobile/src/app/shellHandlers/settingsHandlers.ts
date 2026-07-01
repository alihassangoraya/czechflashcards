import type { StudySettings } from "../../database";
import type { SettingsHandlerInput } from "./handlerTypes";

export function buildSettingsHandlers({ data, settingsTools, showToast, t }: SettingsHandlerInput) {
  return {
    onChangeSettings: (nextSettings: StudySettings) => { void data.persistSettings(nextSettings).then(() => showToast(t("toast.settingsSaved"))); },
    onSyncNow: () => { void data.syncNow().then((status) => showToast(status === "synced" ? t("toast.syncComplete") : t("toast.syncFailed"))); },
    onRestoreJson: settingsTools.restoreJson,
    onImportCsv: settingsTools.importCsv,
    onShuffleDue: settingsTools.shuffleDueCardsInDeck,
    onReviewAllNow: settingsTools.reviewAllNow,
    onExportProgress: () => { void settingsTools.exportProgress(); },
    onExportDeck: settingsTools.exportCurrentDeck,
    onExportAccountData: () => { void settingsTools.exportAccountData(); }
  };
}
