export function toSupabaseCardRow(card, seedVersion) {
  return {
    id: card.id,
    cz: card.cz,
    en: card.en,
    cs: card.cs || "",
    hi: card.hi,
    ur: card.ur,
    uk: card.uk || "",
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
