import type { CustomDeckListItem } from "./customDeckListItems";

export type CustomDeckListControls = {
  activeDeckId: string;
  editingDeckId: string | null;
  editingDeckName: string;
  deleteDeckId: string | null;
  onSelectDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};

export type CustomDeckListProps = CustomDeckListControls & {
  items: CustomDeckListItem[];
};

export type CustomDeckListRowProps = CustomDeckListControls & {
  item: CustomDeckListItem;
};
