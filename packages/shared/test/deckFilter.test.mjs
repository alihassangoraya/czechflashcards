import assert from "node:assert/strict";
import test from "node:test";
import { filterDeck, normalizeCards } from "../src/runtime.mjs";

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
