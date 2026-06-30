import type { Card } from "@czech-flashcards/shared";

export function rememberShownCardId(recentCardIds: string[], card: Card | null, limit: number): string[] {
  if (!card || recentCardIds[recentCardIds.length - 1] === card.id) return recentCardIds;
  return [...recentCardIds.filter((id) => id !== card.id), card.id].slice(-limit);
}
