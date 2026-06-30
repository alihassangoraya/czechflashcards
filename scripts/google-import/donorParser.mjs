import { categories } from "./importConfig.mjs";
import { donorStaticDetails } from "./donorStaticMaps.mjs";
import { donorWordRecord } from "./donorWordRecord.mjs";
import { parseWordPair } from "./donorWordPair.mjs";

export function donorWords(source) {
  const details = donorStaticDetails(source);
  const functions = [...source.matchAll(/private fun get\w+Words\(\): String \{\s*return "([^"]*)"/g)];
  if (functions.length !== categories.length) throw new Error(`Expected ${categories.length} donor categories, found ${functions.length}`);

  const seen = new Set();
  const words = [];
  functions.forEach((match, categoryIndex) => {
    for (const pair of match[1].split(";")) {
      const parsed = parseWordPair(pair);
      if (!parsed) continue;
      const key = parsed.cz.normalize("NFC").toLocaleLowerCase("cs-CZ");
      if (seen.has(key)) continue;
      seen.add(key);
      words.push(donorWordRecord(parsed, categories[categoryIndex], details));
    }
  });
  return words;
}
