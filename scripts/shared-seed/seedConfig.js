const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const outFile = path.join(root, "packages", "shared", "data", "vocabulary.seed.json");
const seedVersion = "google-b1-enriched-v3";
const baseSourceFiles = [
  "data/vocabulary.js",
  "data/extended-lemmas.js",
  "data/focus-decks.js",
  "data/b1-verb-pack.js"
];
const generatedSourceFiles = [
  "data/verb-forms.js",
  "data/google-vocabulary-details.json"
];
const sourceFiles = [...baseSourceFiles, ...generatedSourceFiles];

module.exports = { baseSourceFiles, outFile, root, seedVersion, sourceFiles };
