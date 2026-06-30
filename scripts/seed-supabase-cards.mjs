import { baseUrl, chunkSize, seedPath, supabaseSeedAuth } from "./supabase-seed/supabaseSeedConfig.mjs";
import { assertSupabaseSeedEnv } from "./supabase-seed/supabaseSeedEnv.mjs";
import { loadSeed } from "./supabase-seed/supabaseSeedLoader.mjs";
import { toSupabaseCardRow } from "./supabase-seed/supabaseSeedRow.mjs";
import { upsertCardRows } from "./supabase-seed/supabaseSeedUpsert.mjs";

assertSupabaseSeedEnv(supabaseSeedAuth);

const { cards, seedVersion } = loadSeed(seedPath);
const rows = cards.map((card) => toSupabaseCardRow(card, seedVersion));
for (let offset = 0; offset < rows.length; offset += chunkSize) {
  const chunk = rows.slice(offset, offset + chunkSize);
  await upsertCardRows({ baseUrl, rows: chunk, serviceKey: supabaseSeedAuth.serviceKey, offset });
  console.log(`Seeded ${Math.min(offset + chunk.length, rows.length)}/${rows.length} cards`);
}

console.log(`Seeded ${rows.length} cards to Supabase with seed version ${seedVersion}.`);
