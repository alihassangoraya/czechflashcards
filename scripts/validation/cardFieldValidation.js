const { fillerExample, generatedExample, mojibake, rejectedPlaceholderExample } = require("./qualityRules");
const { hasBalancedParentheses } = require("./textQuality");

function validateRequiredFields(card, label, errors) {
  for (const field of ["cz", "en", "hi", "sentence", "sentenceEn"]) {
    if (!String(card[field] || "").trim()) errors.push(`${label}: missing ${field}`);
  }
}

function validateExamples(card, label, errors) {
  if (fillerExample.test(card.sentence || "") || fillerExample.test(card.sentenceEn || "")) errors.push(`${label}: filler/meta example sentence`);
  if (generatedExample.test(card.sentence || "") || generatedExample.test(card.sentenceEn || "")) errors.push(`${label}: low-quality generated example sentence`);
  if (rejectedPlaceholderExample.test(card.sentence || "") || rejectedPlaceholderExample.test(card.sentenceEn || "")) errors.push(`${label}: rejected placeholder example sentence`);
  if (mojibake.test(card.sentence || "") || mojibake.test(card.sentenceEn || "")) errors.push(`${label}: mojibake in example sentence`);
}

function validateBalancedFields(card, label, errors) {
  for (const field of ["en", "hi", "ur", "sentence", "sentenceEn"]) {
    if (!hasBalancedParentheses(card[field])) errors.push(`${label}: unbalanced parentheses in ${field}`);
  }
}

module.exports = { validateBalancedFields, validateExamples, validateRequiredFields };
