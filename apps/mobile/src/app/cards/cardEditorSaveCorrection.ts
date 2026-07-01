import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../database";
import type { CorrectionValues } from "../appTypes";
import type { Panel } from "../appTypes";
import { saveEditedCard } from "./cardEditorPersistence";

type Input = {
  db: AppDatabase | null;
  editingCard: Card | null;
  values: CorrectionValues;
  clearEditingCard: () => Panel | null;
  forceCard: (cardId: string, reveal?: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export async function saveCardEditorCorrection({ db, editingCard, values, clearEditingCard, forceCard, setPanel, refresh }: Input) {
  if (!db || !editingCard) return null;
  const card = await saveEditedCard({ db, editingCard, values });
  forceCard(card.id, true);
  setPanel(clearEditingCard());
  await refresh(db);
  return card;
}
