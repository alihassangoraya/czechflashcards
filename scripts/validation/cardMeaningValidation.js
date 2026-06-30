const { isExtended, isFormCard } = require("./cardPredicates");
const { hasArabic, hasDevanagari, hasLatin } = require("./qualityRules");
const { hasDuplicateEquivalent } = require("./textQuality");

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

module.exports = { validateMeanings };
