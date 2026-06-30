function hasTag(card, tag) {
  return (card.tags || []).includes(tag);
}

function isNumberCard(card) {
  return hasTag(card, "numbers");
}

function isFormCard(card) {
  return hasTag(card, "forms");
}

function isExtended(card) {
  return hasTag(card, "extended");
}

function isB1Focus(card) {
  return hasTag(card, "b1-focus");
}

function isA2Focus(card) {
  return hasTag(card, "a2-focus");
}

function inferredLevel(card) {
  if (isExtended(card) || isFormCard(card)) return "b1";
  if (isNumberCard(card)) {
    const value = Number(String(card.id || "").replace("number-", ""));
    return Number.isFinite(value) && value <= 100 ? "a2" : "b1";
  }
  return "a2";
}

module.exports = {
  inferredLevel,
  isA2Focus,
  isB1Focus,
  isExtended,
  isFormCard,
  isNumberCard
};
