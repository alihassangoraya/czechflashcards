import { useState } from "react";

export function useCustomDeckDraftState() {
  const [deckName, setDeckName] = useState("");
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editingDeckName, setEditingDeckName] = useState("");
  const [deleteDeckId, setDeleteDeckId] = useState<string | null>(null);

  function resetDeckName() {
    setDeckName("");
  }

  function startEditingDeck(id: string, name: string) {
    setEditingDeckId(id);
    setEditingDeckName(name);
    setDeleteDeckId(null);
  }

  function cancelEditingDeck() {
    setEditingDeckId(null);
    setEditingDeckName("");
  }

  return {
    cancelEditingDeck,
    deckName,
    deleteDeckId,
    editingDeckId,
    editingDeckName,
    resetDeckName,
    setDeckName,
    setDeleteDeckId,
    setEditingDeckName,
    startEditingDeck
  };
}
