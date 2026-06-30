import { useState } from "react";
import type { StudySettings } from "../../../database";
import { buildCreateDeckPatch, buildDeleteDeckPatch, buildRenameDeckPatch } from "../customDeckDraftModel";

type Params = {
  settings: StudySettings;
  update: (patch: Partial<StudySettings>) => void;
};

export function useCustomDeckDraft({ settings, update }: Params) {
  const [deckName, setDeckName] = useState("");
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editingDeckName, setEditingDeckName] = useState("");
  const [deleteDeckId, setDeleteDeckId] = useState<string | null>(null);

  function createDeck() {
    const patch = buildCreateDeckPatch(settings, deckName);
    if (!patch) return;
    update(patch);
    setDeckName("");
  }

  function startEditingDeck(deckId: string) {
    const deck = settings.customDecks.find((item) => item.id === deckId);
    if (!deck) return;
    setEditingDeckId(deck.id);
    setEditingDeckName(deck.name);
    setDeleteDeckId(null);
  }

  function cancelEditingDeck() {
    setEditingDeckId(null);
    setEditingDeckName("");
  }

  function saveEditingDeck() {
    if (!editingDeckId) return;
    const patch = buildRenameDeckPatch(settings, editingDeckId, editingDeckName);
    if (!patch) return;
    update(patch);
    cancelEditingDeck();
  }

  function deleteDeck(deckId: string) {
    update(buildDeleteDeckPatch(settings, deckId));
    if (editingDeckId === deckId) cancelEditingDeck();
    setDeleteDeckId(null);
  }

  return {
    deckName,
    editingDeckId,
    editingDeckName,
    deleteDeckId,
    setDeckName,
    setEditingDeckName,
    setDeleteDeckId,
    createDeck,
    startEditingDeck,
    cancelEditingDeck,
    saveEditingDeck,
    deleteDeck
  };
}
