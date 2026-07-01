import type { Card } from "@czech-flashcards/shared";

export function searchCards(cards: Card[], query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];
  return cards
    .map((card) => ({ card, score: matchScore(card, normalized) }))
    .filter((result) => result.score < Number.POSITIVE_INFINITY)
    .sort((left, right) => left.score - right.score || left.card.cz.localeCompare(right.card.cz, "cs"))
    .slice(0, 40)
    .map((result) => result.card);
}

function matchScore(card: Card, query: string) {
  const fields = [card.cz, card.en, card.cs, card.hi, card.ur, card.uk, card.pronunciation, card.synonyms, card.antonyms].map((value) => String(value || ""));
  const exact = fields.findIndex((value) => value.toLocaleLowerCase() === query);
  if (exact >= 0) return exact;
  const prefix = fields.findIndex((value) => value.toLocaleLowerCase().startsWith(query));
  if (prefix >= 0) return prefix + 10;
  const contains = fields.findIndex((value) => value.toLocaleLowerCase().includes(query));
  return contains >= 0 ? contains + 20 : Number.POSITIVE_INFINITY;
}
