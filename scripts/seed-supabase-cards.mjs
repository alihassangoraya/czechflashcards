import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedPath = path.join(root, "packages", "shared", "data", "vocabulary.seed.json");
const endpoint = process.env.SUPABASE_REST_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";
const chunkSize = Math.max(1, Number(process.env.SEED_CHUNK_SIZE || 500));

if (!endpoint) throw new Error("Set SUPABASE_REST_URL or EXPO_PUBLIC_SUPABASE_URL.");
if (!serviceKey) throw new Error("Set SUPABASE_SERVICE_ROLE_KEY. Do not use the publishable anon key for seeding.");

const baseUrl = endpoint.endsWith("/rest/v1")
  ? endpoint
  : `${endpoint.replace(/\/$/, "")}/rest/v1`;
const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const seedVersion = String(seed.seedVersion || "legacy-seed");

function toRow(card) {
  return {
    id: card.id,
    cz: card.cz,
    en: card.en,
    hi: card.hi,
    ur: card.ur,
    sentence: card.sentence,
    sentence_en: card.sentenceEn || "",
    level: card.level || "b1",
    tags: Array.isArray(card.tags) ? card.tags : [],
    source: card.source === "legacy-web" ? "legacy-web" : "seed",
    pronunciation: card.pronunciation || "",
    synonyms: card.synonyms || "",
    antonyms: card.antonyms || "",
    grammar: card.grammar || null,
    google_category: card.googleCategory || "",
    seed_version: seedVersion,
    updated_at: new Date().toISOString()
  };
}

async function upsertChunk(rows, offset) {
  const response = await fetch(`${baseUrl}/cards?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates"
    },
    body: JSON.stringify(rows)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase seed upsert failed at ${offset}: ${response.status} ${body}`);
  }
}

const rows = seed.cards.map(toRow);
for (let offset = 0; offset < rows.length; offset += chunkSize) {
  const chunk = rows.slice(offset, offset + chunkSize);
  await upsertChunk(chunk, offset);
  console.log(`Seeded ${Math.min(offset + chunk.length, rows.length)}/${rows.length} cards`);
}

console.log(`Seeded ${rows.length} cards to Supabase with seed version ${seedVersion}.`);
