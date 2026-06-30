const { slug } = require("../text/czechText");

function importedGoogleCard(detail, index, metadata, tag) {
  return {
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
}

module.exports = { importedGoogleCard };
