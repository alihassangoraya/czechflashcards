import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDatabase, WebStore } from "./storageTypes";
import { emptyStore } from "./storageDefaults";

const STORAGE_KEY = "czech-flashcards.web-store.v1";

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
