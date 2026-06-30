const { isFormCard, isNumberCard } = require("./cardPredicates");

function validateDuplicateRealWord(card, label, realSeen, errors) {
  if (isNumberCard(card) || isFormCard(card)) return;
  const key = String(card.cz || "").normalize("NFC").toLocaleLowerCase("cs-CZ");
  if (realSeen.has(key)) errors.push(`${label}: duplicate real word "${card.cz}" also in ${realSeen.get(key)}`);
  else realSeen.set(key, label);
}

module.exports = { validateDuplicateRealWord };
