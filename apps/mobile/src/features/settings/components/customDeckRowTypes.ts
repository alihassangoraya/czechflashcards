import type { CustomDeck } from "../../../database";

export type CustomDeckRowProps = {
  deck: CustomDeck;
  count: number;
  active: boolean;
  editing: boolean;
  deleting: boolean;
  editingDeckName: string;
  onSelectDeck: (deckId: string) => void;
  onStartEditDeck: (deckId: string) => void;
  onEditingDeckNameChange: (value: string) => void;
  onCancelEditDeck: () => void;
  onSaveEditDeck: () => void;
  onRequestDeleteDeck: (deckId: string) => void;
  onCancelDeleteDeck: () => void;
  onConfirmDeleteDeck: (deckId: string) => void;
};
