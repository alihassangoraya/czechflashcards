import { fallbackAntonyms, fallbackExample, fallbackSynonyms, grammar, pronunciation } from "./fallbackDetails.mjs";

export function donorWordRecord(parsed, category, details) {
  const key = parsed.cz.normalize("NFC").toLocaleLowerCase("cs-CZ");
  return {
    ...parsed,
    category,
    pronunciation: pronunciation(parsed.cz),
    synonyms: details.synonyms.get(key) || fallbackSynonyms(parsed.cz, category),
    antonyms: details.antonyms.get(key) || fallbackAntonyms(parsed.cz),
    ...(details.examples.get(key) || fallbackExample(parsed.cz, parsed.en, category)),
    grammar: grammar(parsed.cz, parsed.en)
  };
}
