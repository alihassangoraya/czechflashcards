import type { SavedCardIds } from "../savedCardState";

export type SavedCardStateProps = {
  setSavedCardIds: (savedCardIds: SavedCardIds | ((previous: SavedCardIds) => SavedCardIds)) => void;
};
