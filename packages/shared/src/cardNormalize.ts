import type { Card } from "./types";
import type { RawCard } from "./cardRawTypes";
import { normalizeCard } from "./cardNormalizeOne";

export function normalizeCards(cards: RawCard[]): Card[] {
  const seen = new Set<string>();
  return cards
    .filter((card) => card && card.cz && card.en)
    .map(normalizeCard)
    .filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
}
export type { RawCard } from "./cardRawTypes";
