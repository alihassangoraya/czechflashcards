import type { StudySettings } from "../../../database";

export type CustomDeckDraftParams = {
  settings: StudySettings;
  update: (patch: Partial<StudySettings>) => void;
};
