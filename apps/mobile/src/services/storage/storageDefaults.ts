import type { WebStore } from "./storageTypes";

export function emptyStore(): WebStore {
  return {
    cards: [],
    reviewStates: {},
    reviews: [],
    dailyProgress: {},
    customCards: {},
    deckMemberships: {},
    overrides: {},
    savedCardIds: [],
    syncQueue: [],
    nextSyncId: 1
  };
}
