const { loadCards } = require("./seedCardLoader");
const { normalizeForSeed } = require("./seedCardNormalizer");
const { seedVersion, sourceFiles } = require("./seedConfig");

function buildPayload() {
  return JSON.stringify({
    schemaVersion: 1,
    seedVersion,
    generatedFrom: sourceFiles,
    generatedAt: "deterministic",
    cards: loadCards().map(normalizeForSeed)
  }, null, 2) + "\n";
}

module.exports = { buildPayload };
