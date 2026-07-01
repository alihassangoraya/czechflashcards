const { fallbackCategory } = require("./seedCategoryFallback");
const { fallbackGrammar } = require("./seedGrammarFallback");
const { fallbackPronunciation } = require("./seedPronunciationFallback");
const { fallbackAntonyms, fallbackSynonyms } = require("./seedRelatedFallback");

function enrichSeedDetails(card) {
  const category = String(card.googleCategory || "").trim() || fallbackCategory(card);
  const grammar = fallbackGrammar(card.cz, card.en);

  return {
    pronunciation: String(card.pronunciation || "").trim() || fallbackPronunciation(card.cz),
    synonyms: String(card.synonyms || "").trim() || fallbackSynonyms(card.cz, category),
    antonyms: String(card.antonyms || "").trim() || fallbackAntonyms(card.cz),
    grammar: { ...grammar, ...(card.grammar || {}) },
    googleCategory: category
  };
}

module.exports = { enrichSeedDetails };
