import { normalizeCard } from "./cardNormalizeOne.runtime.mjs";

export function normalizeCards(cards) {
  const seen = new Set();
  return cards
    .filter((card) => card && card.cz && card.en)
    .map(normalizeCard)
    .filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
}
