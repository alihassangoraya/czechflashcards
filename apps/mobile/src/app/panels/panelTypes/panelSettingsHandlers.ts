import type { StudySettings } from "../../../database";

export type PanelSettingsHandlers = {
  onChangeSettings: (settings: StudySettings) => void;
  onSyncNow: () => void;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onShuffleDue: () => void;
  onReviewAllNow: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
};
