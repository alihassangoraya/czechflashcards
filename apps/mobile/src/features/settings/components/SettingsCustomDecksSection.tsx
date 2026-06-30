import React from "react";
import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, StudySettings } from "../../../database";
import type { SettingsDraft } from "../hooks/useSettingsDraft";
import { CustomDeckSection } from "./CustomDeckSection";

type Props = {
  cards: Card[];
  deckMemberships: DeckMemberships;
  draft: SettingsDraft;
  settings: StudySettings;
};

export function SettingsCustomDecksSection({ cards, deckMemberships, draft, settings }: Props) {
  return (
    <CustomDeckSection
      deckName={draft.deckName}
      decks={settings.customDecks}
      cards={cards}
      deckMemberships={deckMemberships}
      activeDeckId={settings.deckFilter}
      editingDeckId={draft.editingDeckId}
      editingDeckName={draft.editingDeckName}
      deleteDeckId={draft.deleteDeckId}
      onDeckNameChange={draft.setDeckName}
      onCreateDeck={draft.createDeck}
      onSelectDeck={(deckFilter) => draft.update({ deckFilter })}
      onStartEditDeck={draft.startEditingDeck}
      onEditingDeckNameChange={draft.setEditingDeckName}
      onCancelEditDeck={draft.cancelEditingDeck}
      onSaveEditDeck={draft.saveEditingDeck}
      onRequestDeleteDeck={draft.setDeleteDeckId}
      onCancelDeleteDeck={() => draft.setDeleteDeckId(null)}
      onConfirmDeleteDeck={draft.deleteDeck}
    />
  );
}
