const { enrichSeedDetails } = require("./seedDetailsEnrichment");

function seedSlug(value) {
  return String(value || "card")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeForSeed(card, index) {
  const details = enrichSeedDetails(card);

  return {
    id: card.id || `${seedSlug(card.cz)}-${index}`,
    cz: String(card.cz || "").trim(),
    en: String(card.en || "").trim(),
    cs: String(card.cs || "").trim(),
    hi: String(card.hi || "").trim(),
    ur: String(card.ur || card.urdu || "").trim(),
    uk: String(card.uk || "").trim(),
    sentence: String(card.sentence || "").trim(),
    sentenceEn: String(card.sentenceEn || card.exampleEn || "").trim(),
    level: card.level || null,
    tags: Array.isArray(card.tags) ? card.tags : String(card.tags || "daily").split(/[,\s]+/).filter(Boolean),
    source: card.source || "legacy-web",
    pronunciation: details.pronunciation,
    synonyms: details.synonyms,
    antonyms: details.antonyms,
    grammar: details.grammar,
    googleCategory: details.googleCategory
  };
}

module.exports = { normalizeForSeed };
