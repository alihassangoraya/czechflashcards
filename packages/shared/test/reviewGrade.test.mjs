import assert from "node:assert/strict";
import test from "node:test";
import { DAY, HOUR, applyReviewGrade, createReviewState } from "../src/runtime.mjs";

test("review intervals match the existing web behavior", () => {
  const now = 1_700_000_000_000;
  const initial = createReviewState("ahoj");

  const again = applyReviewGrade(initial, "again", now).state;
  assert.equal(again.knownStreak, 0);
  assert.equal(again.againCount, 1);
  assert.equal(again.dueAt, now + 2 * 60 * 1000);

  const good = applyReviewGrade(initial, "good", now).state;
  assert.equal(good.knownStreak, 1);
  assert.equal(good.dueAt, now + 8 * HOUR);

  const easy = applyReviewGrade(initial, "easy", now).state;
  assert.equal(easy.knownStreak, 2);
  assert.equal(easy.dueAt, now + 4 * DAY);
});
