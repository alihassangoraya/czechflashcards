import type { Card, CardLevel } from "./types";

export function inferLevel(card: Pick<Card, "id" | "tags">): CardLevel {
  if (card.tags.includes("extended") || card.tags.includes("forms")) return "b1";
  if (card.tags.includes("numbers")) {
    const value = Number(String(card.id || "").replace("number-", ""));
    return Number.isFinite(value) && value <= 100 ? "a2" : "b1";
  }
  return "a2";
}
