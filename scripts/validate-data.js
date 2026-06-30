const { validateCard } = require("./validation/cardValidation");
const { countCards, validateCounts } = require("./validation/countValidation");
const { loadVocabularyCards } = require("./validation/vocabularyLoader");
const { reportValidation } = require("./validation/reportValidation");

const cards = loadVocabularyCards();
const errors = [];
const warnings = [];
const realSeen = new Map();

for (const card of cards) {
  validateCard(card, realSeen, errors, warnings);
}

const counts = countCards(cards, realSeen);
validateCounts(cards, counts, errors);
reportValidation({ counts, errors, warnings });
