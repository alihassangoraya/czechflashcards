const fs = require("fs");
const path = require("path");

const detailsPath = path.resolve(__dirname, "..", "data", "google-vocabulary-details.json");

function normalizedCzech(value) {
  return String(value || "").normalize("NFC").trim().toLocaleLowerCase("cs-CZ");
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadGoogleVocabularyDetails() {
  if (!fs.existsSync(detailsPath)) throw new Error(`Google vocabulary data is missing: ${detailsPath}`);
  return JSON.parse(fs.readFileSync(detailsPath, "utf8"));
}

function enrichWithGoogleVocabulary(cards) {
  const details = loadGoogleVocabularyDetails();
  const byCzech = new Map(cards.map((card) => [normalizedCzech(card.cz), card]));

  details.forEach((detail, index) => {
    const metadata = {
      pronunciation: String(detail.pronunciation || "").trim(),
      synonyms: String(detail.synonyms || "").trim(),
      antonyms: String(detail.antonyms || "").trim(),
      grammar: detail.grammar || undefined,
      googleCategory: String(detail.category || "").trim()
    };
    const tag = `google-${slug(detail.category)}`;
    const existing = byCzech.get(normalizedCzech(detail.cz));
    if (existing) {
      Object.assign(existing, metadata, {
        hi: existing.hi || detail.hi,
        ur: existing.ur || detail.ur,
        sentence: existing.sentence || detail.sentence,
        sentenceEn: existing.sentenceEn || detail.sentenceEn,
        tags: Array.from(new Set([...(existing.tags || []), "google", tag]))
      });
      return;
    }

    const imported = {
      id: `google-${index + 1}-${slug(detail.cz)}`,
      cz: detail.cz,
      en: detail.en,
      hi: detail.hi,
      ur: detail.ur,
      sentence: detail.sentence,
      sentenceEn: detail.sentenceEn,
      level: "b1",
      tags: ["google", tag, ...(String(detail.en).toLowerCase().startsWith("to ") ? ["verbs"] : [])],
      source: "seed",
      ...metadata
    };
    cards.push(imported);
    byCzech.set(normalizedCzech(detail.cz), imported);
  });

  return cards;
}

module.exports = { enrichWithGoogleVocabulary, loadGoogleVocabularyDetails };
