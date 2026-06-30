import assert from "node:assert/strict";
import test from "node:test";
import { HOUR, compareDueReviewStates, createReviewState } from "../src/runtime.mjs";

test("due relearning cards appear before scheduled reviews and new cards", () => {
  const now = 1_700_000_000_000;
  const newCard = createReviewState("new");
  const review = { ...createReviewState("review"), seen: 2, knownStreak: 1, dueAt: now - HOUR };
  const relearning = { ...createReviewState("again"), seen: 1, againCount: 1, dueAt: now - 1 };

  assert.ok(compareDueReviewStates(relearning, review, now) < 0);
  assert.ok(compareDueReviewStates(review, newCard, now) < 0);
});
