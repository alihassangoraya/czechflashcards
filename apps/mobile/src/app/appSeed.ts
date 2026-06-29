import { normalizeCards } from "@czech-flashcards/shared";
import seedPayload from "@czech-flashcards/shared/seed";

export const seedCardsNormalized = normalizeCards(seedPayload.cards as Parameters<typeof normalizeCards>[0]);
