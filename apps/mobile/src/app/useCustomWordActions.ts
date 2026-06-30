import { addCardToCustomDeck, addCustomCard, deleteCustomCard, type AppDatabase } from "../database";
import type { AddWordValues } from "./appShellTypes";
import { createCustomCard } from "./cardFactory";

type Props = {
  db: AppDatabase | null;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export function useCustomWordActions({ db, refresh }: Props) {
  async function addWord(values: AddWordValues) {
    if (!db) return;
    if (!values.cz.trim() || !values.en.trim()) return;
    const card = createCustomCard(values);
    await addCustomCard(db, card);
    if (values.tag.startsWith("deck-")) await addCardToCustomDeck(db, values.tag, card.id);
    await refresh(db);
  }

  async function deleteWord(cardId: string) {
    if (!db) return;
    await deleteCustomCard(db, cardId);
    await refresh(db);
  }

  return { addWord, deleteWord };
}
