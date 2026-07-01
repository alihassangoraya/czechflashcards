import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase, WebStore } from "./storageTypes";
import { emptyStore } from "./storageDefaults";

const STORAGE_KEY = "czech-flashcards.web-store.v1";

function isUserCard(card: Card, store: WebStore): boolean {
  return Boolean(store.customCards[card.id]) || card.source === "custom" || card.source === "import";
}

function persistentStore(store: WebStore): WebStore {
  return { ...store, cards: store.cards.filter((card) => isUserCard(card, store)) };
}

export function normalizeStore(value: Partial<WebStore> | null): WebStore {
  return { ...emptyStore(), ...value, nextSyncId: value?.nextSyncId || 1 };
}

export async function persistDatabase(db: AppDatabase): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persistentStore(db.store)));
}

export async function openAppDatabase(): Promise<AppDatabase> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return { store: normalizeStore(raw ? JSON.parse(raw) : null) };
}
