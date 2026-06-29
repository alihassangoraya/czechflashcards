import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDatabase, WebStore } from "./storageTypes";

const STORAGE_KEY = "czech-flashcards.web-store.v1";

function emptyStore(): WebStore {
  return {
    cards: [],
    reviewStates: {},
    reviews: [],
    dailyProgress: {},
    customCards: {},
    overrides: {},
    savedCardIds: [],
    syncQueue: [],
    nextSyncId: 1
  };
}

export function normalizeStore(value: Partial<WebStore> | null): WebStore {
  return { ...emptyStore(), ...value, nextSyncId: value?.nextSyncId || 1 };
}

export async function persistDatabase(db: AppDatabase): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db.store));
}

export async function openAppDatabase(): Promise<AppDatabase> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return { store: normalizeStore(raw ? JSON.parse(raw) : null) };
}

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
