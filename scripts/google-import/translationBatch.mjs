export function loadTranslationMap(entries) {
  return new Map(entries.map((entry) => [entry.cz, { hi: entry.hi, ur: entry.ur }]));
}

async function translateText(text, target) {
  const params = new URLSearchParams({ client: "gtx", sl: "cs", tl: target, dt: "t", q: text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed (${response.status}) for ${text}`);
  const payload = await response.json();
  const translated = payload?.[0]?.map((part) => part?.[0] || "").join("").trim();
  if (!translated) throw new Error(`Translation returned no result for ${text}`);
  return translated;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
      if ((index + 1) % 100 === 0) console.log(`Translated ${index + 1}/${items.length}`);
    }
  }));
  return results;
}

export async function fillMissingTranslations({ words, translations, batchOffset, batchLimit }) {
  const missing = words.filter((word) => !translations.get(word.cz)?.hi || !translations.get(word.cz)?.ur);
  const batch = missing.slice(batchOffset, batchOffset + batchLimit);
  const completed = await mapWithConcurrency(batch, 2, async (word) => ({
    cz: word.cz,
    hi: await translateText(word.cz, "hi"),
    ur: await translateText(word.cz, "ur")
  }));
  for (const entry of completed) translations.set(entry.cz, entry);
  console.log(`Completed translation batch ${batchOffset + 1}-${batchOffset + batch.length} of ${missing.length}`);
}
