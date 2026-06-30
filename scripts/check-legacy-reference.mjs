import { fileURLToPath } from "node:url";
import { inspectLegacyReference } from "./legacy-reference/legacyReferenceInspector.mjs";
import { legacyReferenceRules } from "./legacy-reference/legacyReferenceRules.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const violations = await inspectLegacyReference(root, legacyReferenceRules);

if (violations.length) {
  console.error("Legacy reference guardrail failed:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Legacy web is guarded as reference-only.");
