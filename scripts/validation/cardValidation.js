const { isExtended, isFormCard, isNumberCard } = require("./cardPredicates");
const { requiredCorrections } = require("./requiredCorrections");
const {
  fillerExample,
  generatedExample,
  hasArabic,
  hasDevanagari,
  hasLatin,
  mojibake,
  rejectedPlaceholderExample
} = require("./qualityRules");
const { hasBalancedParentheses, hasDuplicateEquivalent } = require("./textQuality");

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

function validateMeanings(card, label, errors, warnings) {
  if (isExtended(card) && !String(card.ur || "").trim()) errors.push(`${label}: extended card missing Urdu`);
  if (hasDuplicateEquivalent(card.hi)) errors.push(`${label}: duplicate Hindi equivalents`);
  if (hasDuplicateEquivalent(card.ur)) errors.push(`${label}: duplicate Urdu equivalents`);
  if (isExtended(card) && !hasDevanagari.test(card.hi || "")) warnings.push(`${label}: Hindi may not contain Devanagari`);
  if (isExtended(card) && !hasArabic.test(card.ur || "")) warnings.push(`${label}: Urdu may not contain Arabic script`);
  if (hasLatin.test(card.hi || "")) errors.push(`${label}: Hindi meaning must not contain English`);
  if (hasLatin.test(card.ur || "")) errors.push(`${label}: Urdu meaning must not contain English`);
  if (isFormCard(card) && hasDevanagari.test(card.ur || "")) errors.push(`${label}: Urdu form meaning must not contain Hindi script`);
}

function validateRequiredCorrections(card, label, errors) {
  const checks = requiredCorrections[label];
  if (!checks) return;
  for (const [field, pattern] of Object.entries(checks)) {
    const value = field === "tags" ? (card.tags || []).join(" ") : String(card[field] || "");
    if (!pattern.test(value)) errors.push(`${label}: corrected ${field} regressed (${value})`);
  }
}

function validateCard(card, realSeen, errors, warnings) {
  const label = card.id || card.cz || "(missing id)";
  validateRequiredFields(card, label, errors);
  validateExamples(card, label, errors);
  validateMeanings(card, label, errors, warnings);
  for (const field of ["en", "hi", "ur", "sentence", "sentenceEn"]) {
    if (!hasBalancedParentheses(card[field])) errors.push(`${label}: unbalanced parentheses in ${field}`);
  }
  validateRequiredCorrections(card, label, errors);
  if (!isNumberCard(card) && !isFormCard(card)) {
    const key = String(card.cz || "").normalize("NFC").toLocaleLowerCase("cs-CZ");
    if (realSeen.has(key)) errors.push(`${label}: duplicate real word "${card.cz}" also in ${realSeen.get(key)}`);
    else realSeen.set(key, label);
  }
}

module.exports = { validateCard };
