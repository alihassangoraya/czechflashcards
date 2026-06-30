import assert from "node:assert/strict";
import test from "node:test";
import { HOUR, formatInterval } from "../src/runtime.mjs";

test("interval labels remain compact for mobile counters", () => {
  assert.equal(formatInterval(0), "Due now");
  assert.equal(formatInterval(61 * 1000), "2 min");
  assert.equal(formatInterval(90 * 60 * 1000), "2 hr");
  assert.equal(formatInterval(25 * HOUR), "2 days");
});
