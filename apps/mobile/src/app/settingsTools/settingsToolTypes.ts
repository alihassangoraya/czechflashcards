import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../../database";

export type SettingsToolContext = {
  db: AppDatabase | null;
  deck: Card[];
  settings: StudySettings | null;
  setSettingsNotice: (message: string) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export type SettingsImportContext = SettingsToolContext & {
  setSettingsState: (settings: StudySettings) => void;
};
