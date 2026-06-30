import type { StudySettings } from "../../../database";
import type { SyncStatus } from "../../../sync";

export type PanelSettingsDataProps = {
  settings: StudySettings;
  syncStatus: SyncStatus;
};
