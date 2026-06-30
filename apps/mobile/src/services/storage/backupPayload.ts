import type { Card } from "@czech-flashcards/shared";
import type { CardOverrides, DailyProgressLog, ReviewStates, StudySettings, WebStore } from "./storageTypes";

export type BackupPayload = Partial<WebStore> & {
  store?: Partial<WebStore>;
  progress?: ReviewStates;
  reviewStates?: ReviewStates;
  importedCards?: Card[];
  customCards?: Card[];
  editedCards?: CardOverrides;
  savedCardIds?: string[];
  dailyLog?: DailyProgressLog;
  dailyProgress?: DailyProgressLog;
  dailyGoal?: number;
  examLevel?: StudySettings["examLevel"];
  meaningLanguage?: StudySettings["meaningLanguage"];
  settings?: StudySettings;
};

export function assertBackupPayload(payload: unknown): BackupPayload {
  if (!payload || typeof payload !== "object") throw new Error("Backup file is not valid JSON.");
  return payload as BackupPayload;
}
