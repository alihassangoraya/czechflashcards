function mergeGoogleDetail(existing, detail, metadata, tag) {
  Object.assign(existing, metadata, {
    hi: existing.hi || detail.hi,
    ur: existing.ur || detail.ur,
    sentence: existing.sentence || detail.sentence,
    sentenceEn: existing.sentenceEn || detail.sentenceEn,
    tags: Array.from(new Set([...(existing.tags || []), "google", tag]))
  });
}

module.exports = { mergeGoogleDetail };
