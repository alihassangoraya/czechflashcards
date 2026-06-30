import type { SavedCardIds } from "../../database";

export type { SavedCardIds };

export function updateSavedCardIds(savedCardIds: SavedCardIds, cardId: string, saved: boolean): SavedCardIds {
  const next = new Set(savedCardIds);
  if (saved) next.add(cardId);
  else next.delete(cardId);
  return next;
}
