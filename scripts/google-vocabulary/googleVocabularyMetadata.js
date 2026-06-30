function googleVocabularyMetadata(detail) {
  return {
    pronunciation: String(detail.pronunciation || "").trim(),
    synonyms: String(detail.synonyms || "").trim(),
    antonyms: String(detail.antonyms || "").trim(),
    grammar: detail.grammar || undefined,
    googleCategory: String(detail.category || "").trim()
  };
}

module.exports = { googleVocabularyMetadata };
