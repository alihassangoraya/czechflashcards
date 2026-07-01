import type { StudySettings } from "../../../database";

export type MainSettingsHandlers = {
  onChangeSettings: (settings: StudySettings) => void;
  onSyncNow: () => void;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onShuffleDue: () => boolean;
  onReviewAllNow: () => Promise<boolean>;
  onExportProgress: () => void;
  onExportDeck: () => void;
  onExportAccountData: () => void;
};
