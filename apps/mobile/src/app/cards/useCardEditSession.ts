import { useCallback, useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import type { Panel } from "../appTypes";

export function useCardEditSession() {
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [editReturnPanel, setEditReturnPanel] = useState<Panel | null>(null);

  const startEditingCard = useCallback((card: Card, returnPanel: Panel | null) => {
    setEditingCard(card);
    setEditReturnPanel(returnPanel);
  }, []);

  const clearEditingCard = useCallback(() => {
    const returnPanel = editReturnPanel;
    setEditingCard(null);
    setEditReturnPanel(null);
    return returnPanel;
  }, [editReturnPanel]);

  return { clearEditingCard, editingCard, startEditingCard };
}
