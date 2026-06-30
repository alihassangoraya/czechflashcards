const { validateRequiredCorrections } = require("./cardCorrectionValidation");
const { validateDuplicateRealWord } = require("./cardDuplicateValidation");
const { validateBalancedFields, validateExamples, validateRequiredFields } = require("./cardFieldValidation");
const { validateMeanings } = require("./cardMeaningValidation");

function validateCard(card, realSeen, errors, warnings) {
  const label = card.id || card.cz || "(missing id)";
  validateRequiredFields(card, label, errors);
  validateExamples(card, label, errors);
  validateMeanings(card, label, errors, warnings);
  validateBalancedFields(card, label, errors);
  validateRequiredCorrections(card, label, errors);
  validateDuplicateRealWord(card, label, realSeen, errors);
}

module.exports = { validateCard };
