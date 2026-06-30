import { useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import { addCustomCard, saveCardCorrection, type AppDatabase } from "../../database";
import type { Panel } from "../appTypes";
import type { CorrectionValues } from "../appShellTypes";
import { applyCardCorrection } from "./cardFactory";

type Props = {
  db: AppDatabase | null;
  current: Card | null;
  panel: Panel | null;
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  forceCard: (cardId: string, reveal?: boolean) => void;
};

export function useCardEditor({ db, current, panel, setCurrent, setRevealed, setPanel, setSessionReviews, refresh, forceCard }: Props) {
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [editReturnPanel, setEditReturnPanel] = useState<Panel | null>(null);

  async function saveCorrection(values: CorrectionValues) {
    if (!db || !editingCard) return;
    const card = applyCardCorrection(editingCard, values);
    if (card.source === "custom") await addCustomCard(db, card);
    else await saveCardCorrection(db, card);
    forceCard(card.id, true);
    const returnPanel = editReturnPanel;
    setEditingCard(null);
    setEditReturnPanel(null);
    setPanel(returnPanel);
    await refresh(db);
  }

  function openCardEditor(card = current) {
    if (!card) return;
    setEditingCard(card);
    setEditReturnPanel(panel === "add" ? "add" : null);
    setPanel("edit");
  }

  function closeCardEditor() {
    const returnPanel = editReturnPanel;
    setEditingCard(null);
    setEditReturnPanel(null);
    setPanel(returnPanel);
  }

  function studySearchResult(card: Card) {
    forceCard(card.id, true);
    setCurrent(card);
    setRevealed(true);
    setSessionReviews(0);
    setPanel(null);
  }

  return { editingCard, saveCorrection, openCardEditor, closeCardEditor, studySearchResult };
}
