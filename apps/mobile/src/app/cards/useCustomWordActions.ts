import type { AddWordValues } from "../appTypes";
import { removeCustomWord, saveCustomWord } from "./customWordPersistence";
import type { CustomWordActionProps } from "./customWordTypes";
import { isValidCustomWord } from "./customWordValidation";

export function useCustomWordActions({ db, refresh }: CustomWordActionProps) {
  async function addWord(values: AddWordValues) {
    if (!db) return;
    if (!isValidCustomWord(values)) return;
    await saveCustomWord(db, values);
    await refresh(db);
  }

  async function deleteWord(cardId: string) {
    if (!db) return;
    await removeCustomWord(db, cardId);
    await refresh(db);
  }

  return { addWord, deleteWord };
}
