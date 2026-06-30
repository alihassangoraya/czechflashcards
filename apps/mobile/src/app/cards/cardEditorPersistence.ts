import type { Card } from "@czech-flashcards/shared";
import { addCustomCard, saveCardCorrection, type AppDatabase } from "../../database";
import type { CorrectionValues } from "../appTypes";
import { applyCardCorrection } from "./cardFactory";

type SaveEditedCardInput = {
  db: AppDatabase;
  editingCard: Card;
  values: CorrectionValues;
};

export async function saveEditedCard({ db, editingCard, values }: SaveEditedCardInput): Promise<Card> {
  const card = applyCardCorrection(editingCard, values);
  if (card.source === "custom") await addCustomCard(db, card);
  else await saveCardCorrection(db, card);
  return card;
}
