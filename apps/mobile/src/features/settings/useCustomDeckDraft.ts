import { useState } from "react";
import type { StudySettings } from "../../database";
import { slug } from "./settingsFormat";

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
    const name = normalizeDeckName(deckName);
    if (!name || settings.customDecks.some((deck) => deck.name.toLowerCase() === name.toLowerCase())) return;
    const deck = { id: `deck-${slug(name)}-${Date.now()}`, name };
    update({ customDecks: [...settings.customDecks, deck], deckFilter: deck.id });
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
    const name = normalizeDeckName(editingDeckName);
    if (!name) return;
    const duplicate = settings.customDecks.some((deck) => deck.id !== editingDeckId && deck.name.toLowerCase() === name.toLowerCase());
    if (duplicate) return;
    update({ customDecks: settings.customDecks.map((deck) => deck.id === editingDeckId ? { ...deck, name } : deck) });
    cancelEditingDeck();
  }

  function deleteDeck(deckId: string) {
    const nextDecks = settings.customDecks.filter((deck) => deck.id !== deckId);
    update({
      customDecks: nextDecks,
      deckFilter: settings.deckFilter === deckId ? `${settings.examLevel}-focus` : settings.deckFilter
    });
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

function normalizeDeckName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}
