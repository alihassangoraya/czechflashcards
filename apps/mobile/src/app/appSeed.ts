import { normalizeCards } from "@czech-flashcards/shared";

type SeedPayload = {
  cards: Parameters<typeof normalizeCards>[0];
  seedVersion?: string;
};

export async function loadSeedCards() {
  const seedPayload = (await import("@czech-flashcards/shared/seed")).default as unknown as SeedPayload;
  return {
    cards: normalizeCards(seedPayload.cards),
    seedVersion: String(seedPayload.seedVersion || "legacy-seed")
  };
}
