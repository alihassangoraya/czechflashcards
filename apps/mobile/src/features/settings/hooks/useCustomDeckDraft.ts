import { buildCreateDeckPatch, buildDeleteDeckPatch, buildRenameDeckPatch } from "../customDeckDraftModel";
import type { CustomDeckDraftParams } from "./customDeckDraftTypes";
import { useCustomDeckDraftState } from "./useCustomDeckDraftState";
export function useCustomDeckDraft({ settings, update }: CustomDeckDraftParams) {
  const draft = useCustomDeckDraftState();

  function createDeck() {
    const patch = buildCreateDeckPatch(settings, draft.deckName);
    if (!patch) return;
    update(patch);
    draft.resetDeckName();
  }

  function startEditingDeck(deckId: string) {
    const deck = settings.customDecks.find((item) => item.id === deckId);
    if (!deck) return;
    draft.startEditingDeck(deck.id, deck.name);
  }

  function saveEditingDeck() {
    if (!draft.editingDeckId) return;
    const patch = buildRenameDeckPatch(settings, draft.editingDeckId, draft.editingDeckName);
    if (!patch) return;
    update(patch);
    draft.cancelEditingDeck();
  }

  function deleteDeck(deckId: string) {
    update(buildDeleteDeckPatch(settings, deckId));
    if (draft.editingDeckId === deckId) draft.cancelEditingDeck();
    draft.setDeleteDeckId(null);
  }
  return {
    ...draft,
    createDeck,
    startEditingDeck,
    saveEditingDeck,
    deleteDeck
  };
}
