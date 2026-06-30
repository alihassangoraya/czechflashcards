import assert from "node:assert/strict";
import test from "node:test";
import {
  DAY,
  HOUR,
  applyReviewGrade,
  compareDueReviewStates,
  createReviewState,
  filterDeck,
  formatInterval,
  normalizeCards,
  parseCsvCards,
  recordDailyReview,
  undoDailyReview
} from "../src/runtime.mjs";

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

test("due relearning cards appear before scheduled reviews and new cards", () => {
  const now = 1_700_000_000_000;
  const newCard = createReviewState("new");
  const review = { ...createReviewState("review"), seen: 2, knownStreak: 1, dueAt: now - HOUR };
  const relearning = { ...createReviewState("again"), seen: 1, againCount: 1, dueAt: now - 1 };

  assert.ok(compareDueReviewStates(relearning, review, now) < 0);
  assert.ok(compareDueReviewStates(review, newCard, now) < 0);
});

test("normalization and A2/B1 filtering preserve current deck semantics", () => {
  const cards = normalizeCards([
    { id: "core", cz: "ahoj", en: "hi", hi: "नमस्ते", tags: ["daily"] },
    { id: "number-100", cz: "sto", en: "one hundred", hi: "सौ", tags: ["numbers"] },
    { id: "number-101", cz: "sto jedna", en: "one hundred one", hi: "एक सौ एक", tags: ["numbers"] },
    { id: "a2-focus", cz: "nakupovat", en: "to shop", hi: "खरीदारी करना", tags: ["a2-focus"] },
    { id: "b1-focus", cz: "argument", en: "argument", hi: "तर्क", tags: ["extended", "b1-focus"] },
    { id: "form", cz: "jsem", en: "I am", hi: "मैं हूँ", tags: ["forms"] },
    { id: "custom-x", cz: "foo", en: "bar", hi: "baz", tags: ["custom"] }
  ]);

  assert.deepEqual(filterDeck(cards, "a2", "all").map((card) => card.id), ["core", "number-100", "a2-focus", "custom-x"]);
  assert.deepEqual(filterDeck(cards, "b1", "all").map((card) => card.id), ["core", "number-100", "number-101", "a2-focus", "b1-focus", "form", "custom-x"]);
  assert.deepEqual(filterDeck(cards, "b1", "core").map((card) => card.id), ["core", "a2-focus", "b1-focus", "custom-x"]);
  assert.deepEqual(filterDeck(cards, "a2", "a2-focus").map((card) => card.id), ["a2-focus"]);
  assert.deepEqual(filterDeck(cards, "a2", "b1-focus").map((card) => card.id), ["b1-focus"]);
  assert.deepEqual(filterDeck(cards, "a2", "saved", new Set(["b1-focus", "custom-x"])).map((card) => card.id), ["b1-focus", "custom-x"]);
});

test("CSV import accepts current header format and legacy column order", () => {
  const withHeader = parseCsvCards("czech,english,hindi,urdu,sentence,sentence_en,tags\nschůzka,meeting,मीटिंग,میٹنگ,Zítra mám schůzku.,Tomorrow I have a meeting.,work", 10);
  assert.equal(withHeader[0].id, "import-10-0");
  assert.equal(withHeader[0].ur, "میٹنگ");
  assert.equal(withHeader[0].sentenceEn, "Tomorrow I have a meeting.");

  const legacy = parseCsvCards("vlak,train,ट्रेन,Vlak jede.,travel", 10);
  assert.equal(legacy[0].id, "import-10-0-vlak");
  assert.equal(legacy[0].sentence, "Vlak jede.");
  assert.equal(legacy[0].tags, "travel");
});

test("interval labels remain compact for mobile counters", () => {
  assert.equal(formatInterval(0), "Due now");
  assert.equal(formatInterval(61 * 1000), "2 min");
  assert.equal(formatInterval(90 * 60 * 1000), "2 hr");
  assert.equal(formatInterval(25 * HOUR), "2 days");
});

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
