import assert from "node:assert/strict";
import test from "node:test";
import {
  DAY,
  HOUR,
  applyReviewGrade,
  createReviewState,
  filterDeck,
  formatInterval,
  normalizeCards,
  parseCsvCards
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

test("normalization and A2/B1 filtering preserve current deck semantics", () => {
  const cards = normalizeCards([
    { id: "core", cz: "ahoj", en: "hi", hi: "नमस्ते", tags: ["daily"] },
    { id: "number-100", cz: "sto", en: "one hundred", hi: "सौ", tags: ["numbers"] },
    { id: "number-101", cz: "sto jedna", en: "one hundred one", hi: "एक सौ एक", tags: ["numbers"] },
    { id: "form", cz: "jsem", en: "I am", hi: "मैं हूँ", tags: ["forms"] },
    { id: "custom-x", cz: "foo", en: "bar", hi: "baz", tags: ["custom"] }
  ]);

  assert.deepEqual(filterDeck(cards, "a2", "all").map((card) => card.id), ["core", "number-100", "custom-x"]);
  assert.deepEqual(filterDeck(cards, "b1", "all").map((card) => card.id), ["core", "number-100", "number-101", "form", "custom-x"]);
  assert.deepEqual(filterDeck(cards, "b1", "core").map((card) => card.id), ["core", "custom-x"]);
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
