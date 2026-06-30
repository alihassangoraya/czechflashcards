import type { StudySettings } from "../../database";
import type { AppShellHandlerInput } from "./handlerInput";

type Input = Pick<AppShellHandlerInput, "data" | "settingsTools">;

export function buildSettingsHandlers({ data, settingsTools }: Input) {
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
