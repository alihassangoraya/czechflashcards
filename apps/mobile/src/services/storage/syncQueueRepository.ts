import type { AppDatabase } from "./storageTypes";
import { persistDatabase } from "./storageCore";

export async function enqueueSync(db: AppDatabase, type: string, payload: unknown): Promise<void> {
  db.store.syncQueue.push({ id: db.store.nextSyncId++, type, payload, createdAt: Date.now() });
  await persistDatabase(db);
}
