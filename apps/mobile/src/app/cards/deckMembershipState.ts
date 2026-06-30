export type DeckMemberships = Record<string, string[]>;

function updateDeckMembership(
  memberships: DeckMemberships,
  deckId: string,
  cardId: string,
  update: (ids: Set<string>) => void
): DeckMemberships {
  const nextIds = new Set(memberships[deckId] || []);
  update(nextIds);
  return { ...memberships, [deckId]: [...nextIds] };
}

export function addDeckMembership(memberships: DeckMemberships, deckId: string, cardId: string): DeckMemberships {
  return updateDeckMembership(memberships, deckId, cardId, (ids) => ids.add(cardId));
}

export function removeDeckMembership(memberships: DeckMemberships, deckId: string, cardId: string): DeckMemberships {
  return updateDeckMembership(memberships, deckId, cardId, (ids) => ids.delete(cardId));
}
