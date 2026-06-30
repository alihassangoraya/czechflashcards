import assert from "node:assert/strict";
import test from "node:test";
import { parseCsvCards } from "../src/runtime.mjs";

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
