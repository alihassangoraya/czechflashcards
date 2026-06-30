import React from "react";
import type { Card } from "@czech-flashcards/shared";
import type { CustomDeck, DeckMemberships } from "../../../database";
import { CustomDeckCreateRow } from "./CustomDeckCreateRow";
import { CustomDeckList } from "./CustomDeckList";
import { createCustomDeckListItems } from "./customDeckListItems";
import type { CustomDeckListControls } from "./customDeckListTypes";

type CustomDeckCreateControls = {
  deckName: string;
  onDeckNameChange: (value: string) => void;
  onCreateDeck: () => void;
};

export type CustomDeckManagementProps = CustomDeckCreateControls & CustomDeckListControls & {
  decks: CustomDeck[];
  cards: Card[];
  deckMemberships: DeckMemberships;
};

export function CustomDeckManagement({ deckName, decks, cards, deckMemberships, onDeckNameChange, onCreateDeck, ...listControls }: CustomDeckManagementProps) {
  const deckItems = createCustomDeckListItems(decks, cards, deckMemberships);

  return (
    <>
      <CustomDeckCreateRow deckName={deckName} onDeckNameChange={onDeckNameChange} onCreateDeck={onCreateDeck} />
      <CustomDeckList
        items={deckItems}
        {...listControls}
      />
    </>
  );
}
