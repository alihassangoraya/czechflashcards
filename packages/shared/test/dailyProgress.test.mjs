import assert from "node:assert/strict";
import test from "node:test";
import { recordDailyReview, undoDailyReview } from "../src/runtime.mjs";

test("daily progress records and undoes review counts without going negative", () => {
  const date = "2026-06-30";
  const first = recordDailyReview(undefined, date, 2, true);
  assert.deepEqual(first, { date, reviewed: 1, newCards: 1, goal: 2, completed: false });

  const second = recordDailyReview(first, date, 2, false);
  assert.deepEqual(second, { date, reviewed: 2, newCards: 1, goal: 2, completed: true });

  const undone = undoDailyReview(second, date, 2, true);
  assert.deepEqual(undone, { date, reviewed: 1, newCards: 0, goal: 2, completed: false });

  const emptyUndo = undoDailyReview(undefined, date, 2, true);
  assert.deepEqual(emptyUndo, { date, reviewed: 0, newCards: 0, goal: 2, completed: false });
});
