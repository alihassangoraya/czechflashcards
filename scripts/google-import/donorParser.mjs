import { categories } from "./importConfig.mjs";
import { fallbackAntonyms, fallbackExample, fallbackSynonyms, grammar, pronunciation } from "./fallbackDetails.mjs";

function section(source, name, nextName) {
  const start = source.indexOf(`private fun ${name}`);
  const end = nextName ? source.indexOf(`private fun ${nextName}`, start) : source.length;
  return source.slice(start, end);
}

function staticMap(block) {
  return new Map([...block.matchAll(/"([^"]+)"\s+to\s+"([^"]+)"/g)].map(([, key, value]) => [key, value]));
}

function staticExamples(source) {
  return new Map([...section(source, "generateSimpleExample", "getDailyRoutinesSocialWords").matchAll(/"([^"]+)"\s*->\s*Pair\("([^"]*)",\s*"([^"]*)"\)/g)].map(([, key, sentence, sentenceEn]) => [key, { sentence, sentenceEn }]));
}

function parseWordPair(pair) {
  const separator = pair.indexOf(":");
  if (separator < 1) return null;
  const cz = pair.slice(0, separator).trim();
  const en = pair.slice(separator + 1).trim();
  return cz && en ? { cz, en } : null;
}

export function donorWords(source) {
  const synonyms = staticMap(section(source, "generateSynonyms", "generateSimplePronunciation"));
  const antonyms = staticMap(section(source, "generateAntonyms"));
  const examples = staticExamples(source);
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
      const category = categories[categoryIndex];
      words.push({
        ...parsed,
        category,
        pronunciation: pronunciation(parsed.cz),
        synonyms: synonyms.get(key) || fallbackSynonyms(parsed.cz, category),
        antonyms: antonyms.get(key) || fallbackAntonyms(parsed.cz),
        ...(examples.get(key) || fallbackExample(parsed.cz, parsed.en, category)),
        grammar: grammar(parsed.cz, parsed.en)
      });
    }
  });
  return words;
}
