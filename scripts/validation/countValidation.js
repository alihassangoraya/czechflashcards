const { inferredLevel, isA2Focus, isB1Focus, isExtended, isFormCard, isNumberCard } = require("./cardPredicates");

function countCards(cards, realSeen) {
  return {
    total: cards.length,
    a2All: cards.filter((card) => inferredLevel(card) === "a2").length,
    a2Core: cards.filter((card) => inferredLevel(card) === "a2" && !isNumberCard(card) && !isFormCard(card)).length,
    b1Extended: cards.filter(isExtended).length,
    b1Forms: cards.filter(isFormCard).length,
    realUnique: realSeen.size,
    a2Focus: cards.filter(isA2Focus).length,
    b1Focus: cards.filter(isB1Focus).length
  };
}

function validateCounts(cards, counts, errors) {
  if (counts.a2Core < 650) errors.push(`A2 core count too low: ${counts.a2Core}`);
  if (counts.realUnique < 2000) errors.push(`Unique real-word count too low: ${counts.realUnique}`);
  if (counts.b1Extended < 1200) errors.push(`Extended lemma count too low: ${counts.b1Extended}`);
  if (counts.b1Forms < 1000) errors.push(`Verb form count too low: ${counts.b1Forms}`);
  if (counts.a2Focus !== 1000) errors.push(`A2 Focus count must be 1000: ${counts.a2Focus}`);
  if (counts.b1Focus !== 1000) errors.push(`B1 Focus count must be 1000: ${counts.b1Focus}`);

  const a2FocusIds = new Set(cards.filter(isA2Focus).map((card) => card.id));
  for (const card of cards.filter(isB1Focus)) {
    if (a2FocusIds.has(card.id)) errors.push(`${card.id}: card cannot belong to both A2 and B1 Focus`);
    if (!isExtended(card)) errors.push(`${card.id}: B1 Focus card must be an extended lemma`);
  }
  for (const card of cards.filter(isA2Focus)) {
    if (isNumberCard(card) || isFormCard(card)) errors.push(`${card.id}: A2 Focus cannot include number or form cards`);
  }
}

module.exports = { countCards, validateCounts };
