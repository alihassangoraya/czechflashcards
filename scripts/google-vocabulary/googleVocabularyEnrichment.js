const { normalizedCzech, slug } = require("../text/czechText");
const { importedGoogleCard } = require("./googleVocabularyImport");
const { loadGoogleVocabularyDetails } = require("./googleVocabularyDetails");
const { googleVocabularyMetadata } = require("./googleVocabularyMetadata");
const { mergeGoogleDetail } = require("./googleVocabularyMerge");

function enrichWithGoogleVocabulary(cards) {
  const byCzech = new Map(cards.map((card) => [normalizedCzech(card.cz), card]));

  loadGoogleVocabularyDetails().forEach((detail, index) => {
    const metadata = googleVocabularyMetadata(detail);
    const tag = `google-${slug(detail.category)}`;
    const existing = byCzech.get(normalizedCzech(detail.cz));
    if (existing) return mergeGoogleDetail(existing, detail, metadata, tag);

    const imported = importedGoogleCard(detail, index, metadata, tag);
    cards.push(imported);
    byCzech.set(normalizedCzech(detail.cz), imported);
  });

  return cards;
}

module.exports = { enrichWithGoogleVocabulary };
