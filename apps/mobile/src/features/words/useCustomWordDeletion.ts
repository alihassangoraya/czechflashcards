import { useState } from "react";
import type { Card } from "@czech-flashcards/shared";

type Input = {
  onDelete: (cardId: string) => void;
  onEdit: (card: Card) => void;
};

export function useCustomWordDeletion({ onDelete, onEdit }: Input) {
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  function confirmDelete(cardId: string) {
    onDelete(cardId);
    setDeleteCandidateId(null);
  }

  function editWord(card: Card) {
    setDeleteCandidateId(null);
    onEdit(card);
  }

  return { deleteCandidateId, setDeleteCandidateId, confirmDelete, editWord };
}
