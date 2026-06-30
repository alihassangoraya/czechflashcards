import type { StudySettings } from "../../../database";
import type { SettingsToolContext } from "./settingsToolContext";

export type SettingsImportContext = SettingsToolContext & {
  setSettingsState: (settings: StudySettings) => void;
};
