const fs = require("fs");
const vm = require("vm");
const { enrichWithGoogleVocabulary } = require("../google-vocabulary");

const vocabularyFiles = [
  "data/vocabulary.js",
  "data/extended-lemmas.js",
  "data/focus-decks.js",
  "data/verb-forms.js"
];

function loadVocabularyCards() {
  const context = { window: {} };
  context.globalThis = context;
  vm.createContext(context);

  for (const file of vocabularyFiles) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }

  return enrichWithGoogleVocabulary(context.window.CZECH_B1_VOCAB || []);
}

module.exports = { loadVocabularyCards, vocabularyFiles };
