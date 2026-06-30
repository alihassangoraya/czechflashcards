import { openAppDatabase, seedCards } from "../../database";
import { loadSeedCards } from "./appSeed";

export async function openSeededDatabase() {
  const database = await openAppDatabase();
  const seed = await loadSeedCards();
  await seedCards(database, seed.cards, seed.seedVersion);
  return database;
}
