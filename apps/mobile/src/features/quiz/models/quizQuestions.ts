import type { Card } from "@czech-flashcards/shared";

export type Question = {
  card: Card;
  options: string[];
  correctIndex: number;
};

export function buildQuestions(deck: Card[]): Question[] {
  const pool = deck.filter((card) => card.cz && card.en);
  const meanings = Array.from(new Set(pool.map((card) => card.en)));
  if (pool.length < 4 || meanings.length < 4) return [];

  // Build only the questions displayed in this session. Building distractors
  // for every B1 card is noticeably slower on larger decks.
  return shuffle(pool).slice(0, Math.min(10, pool.length)).map((card) => {
    const distractors = shuffle(meanings.filter((meaning) => meaning !== card.en)).slice(0, 3);
    const options = shuffle([...distractors, card.en]);
    return { card, options, correctIndex: options.indexOf(card.en) };
  });
}

function shuffle<T>(items: T[]): T[] {
  const result = items.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[nextIndex]] = [result[nextIndex], result[index]];
  }
  return result;
}
