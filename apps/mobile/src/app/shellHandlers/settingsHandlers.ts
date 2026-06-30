import type { StudySettings } from "../../database";
import type { SettingsHandlerInput } from "./handlerTypes";

export function buildSettingsHandlers({ data, settingsTools }: SettingsHandlerInput) {
  return {
    onChangeSettings: (nextSettings: StudySettings) => { void data.persistSettings(nextSettings); },
    onSyncNow: () => { void data.syncNow(); },
    onRestoreJson: settingsTools.restoreJson,
    onImportCsv: settingsTools.importCsv,
    onShuffleDue: settingsTools.shuffleDueCardsInDeck,
    onReviewAllNow: () => { void settingsTools.reviewAllNow(); },
    onExportProgress: () => { void settingsTools.exportProgress(); },
    onExportDeck: settingsTools.exportCurrentDeck
  };
}
