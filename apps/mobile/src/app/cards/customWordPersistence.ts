import { addCardToCustomDeck, addCustomCard, deleteCustomCard, type AppDatabase } from "../../database";
import type { AddWordValues } from "../appTypes";
import { createCustomCard } from "./cardFactory";

export async function saveCustomWord(db: AppDatabase, values: AddWordValues) {
  const card = createCustomCard(values);
  await addCustomCard(db, card);
  if (values.tag.startsWith("deck-")) await addCardToCustomDeck(db, values.tag, card.id);
}

export async function removeCustomWord(db: AppDatabase, cardId: string) {
  await deleteCustomCard(db, cardId);
}
