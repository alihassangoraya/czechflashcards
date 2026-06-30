import { addCardToCustomDeck, removeCardFromCustomDeck, type AppDatabase } from "../../database";

type DeckMembershipPersistenceInput = {
  db: AppDatabase;
  deckId: string;
  cardId: string;
};

export async function persistDeckMembershipAdd({ db, deckId, cardId }: DeckMembershipPersistenceInput) {
  await addCardToCustomDeck(db, deckId, cardId);
}

export async function persistDeckMembershipRemoval({ db, deckId, cardId }: DeckMembershipPersistenceInput) {
  await removeCardFromCustomDeck(db, deckId, cardId);
}
