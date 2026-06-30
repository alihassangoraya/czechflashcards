import { restoreBackup, seedCards, type AppDatabase, type StudySettings } from "../../database";
import { loadSeedCards } from "../data/appSeed";

export async function restoreSettingsBackup(db: AppDatabase, text: string): Promise<StudySettings> {
  const nextSettings = await restoreBackup(db, JSON.parse(text));
  const seed = await loadSeedCards();
  await seedCards(db, seed.cards, seed.seedVersion);
  return nextSettings;
}
