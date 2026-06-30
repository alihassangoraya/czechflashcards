import { getCustomCards } from "./customCards";
import type { AppShellDataInput } from "./shellDataInput";

export function buildDeckDataProps({ data, deck }: AppShellDataInput) {
  if (!data.settings) throw new Error("Cannot build deck data before settings load");
  return {
    deck,
    cards: data.cards,
    customCards: getCustomCards(data.cards),
    states: data.states,
    settings: data.settings,
    savedCardIds: data.savedCardIds,
    deckMemberships: data.deckMemberships
  };
}
