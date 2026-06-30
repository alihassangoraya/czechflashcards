import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { inspectReadmeArchitecture } from "./docs/readmeArchitectureInspector.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const readme = await readFile(join(root, "README.md"), "utf8");
const violations = inspectReadmeArchitecture(readme);

if (violations.length) {
  console.error("README architecture check failed:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("README architecture map is current.");
