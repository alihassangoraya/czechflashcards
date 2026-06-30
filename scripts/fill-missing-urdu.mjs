import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedFile = path.join(root, "packages", "shared", "data", "vocabulary.seed.json");
const overridesFile = path.join(root, "data", "legacy-urdu-overrides.json");
const limitArg = process.argv.find((argument) => argument.startsWith("--limit="));
const limit = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : Number.POSITIVE_INFINITY;

function normalizedCzech(value) {
  return String(value || "").normalize("NFC").trim().toLocaleLowerCase("cs-CZ");
}

async function translateToUrdu(text) {
  const params = new URLSearchParams({ client: "gtx", sl: "en", tl: "ur", dt: "t", q: text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed (${response.status}) for ${text}`);
  const payload = await response.json();
  const translated = payload?.[0]?.map((part) => part?.[0] || "").join("").trim();
  if (!translated) throw new Error(`Translation returned no result for ${text}`);
  return translated;
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
      if ((index + 1) % 25 === 0 || index + 1 === items.length) console.log(`Translated ${index + 1}/${items.length}`);
    }
  }));
  return results;
}

const seed = JSON.parse(fs.readFileSync(seedFile, "utf8"));
const overrides = fs.existsSync(overridesFile) ? JSON.parse(fs.readFileSync(overridesFile, "utf8")) : {};
const overrideKeys = new Set(Object.keys(overrides).map(normalizedCzech));
const missing = seed.cards
  .filter((card) => !String(card.ur || "").trim())
  .filter((card) => !overrideKeys.has(normalizedCzech(card.cz)))
  .slice(0, limit);

if (!missing.length) {
  console.log("No missing Urdu overrides to fill.");
  process.exit(0);
}

const translated = await mapWithConcurrency(missing, 3, async (card) => ({
  cz: card.cz,
  ur: await translateToUrdu(card.en || card.cz)
}));

for (const entry of translated) overrides[entry.cz] = entry.ur;
const sorted = Object.fromEntries(Object.entries(overrides).sort(([left], [right]) => left.localeCompare(right, "cs")));
fs.writeFileSync(overridesFile, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`Wrote ${translated.length} Urdu overrides to ${overridesFile}`);
