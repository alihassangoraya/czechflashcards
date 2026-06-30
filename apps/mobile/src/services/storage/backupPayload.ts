import type { Card, DailyProgress } from "@czech-flashcards/shared";
import type { ReviewStates, StudySettings, WebStore } from "./storageTypes";

export type BackupPayload = Partial<WebStore> & {
  store?: Partial<WebStore>;
  progress?: ReviewStates;
  reviewStates?: ReviewStates;
  importedCards?: Card[];
  customCards?: Card[];
  editedCards?: Record<string, Card>;
  savedCardIds?: string[];
  dailyLog?: Record<string, DailyProgress>;
  dailyProgress?: Record<string, DailyProgress>;
  dailyGoal?: number;
  examLevel?: StudySettings["examLevel"];
  meaningLanguage?: StudySettings["meaningLanguage"];
  settings?: StudySettings;
};

export function assertBackupPayload(payload: unknown): BackupPayload {
  if (!payload || typeof payload !== "object") throw new Error("Backup file is not valid JSON.");
  return payload as BackupPayload;
}
