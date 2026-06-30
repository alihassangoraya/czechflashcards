import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const sharedSrc = join(root, "packages/shared/src");
const maxLines = 50;
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    if (entry.isFile() && /\.(ts|mjs)$/.test(entry.name)) files.push(path);
  }
}

await collect(sharedSrc);

const violations = [];
for (const file of files) {
  const content = await readFile(file, "utf8");
  const lineCount = content.split("\n").length;
  if (lineCount > maxLines) violations.push(`${relative(sharedSrc, file)}: ${lineCount} lines > ${maxLines}`);
}

if (violations.length) {
  console.error("Shared architecture check failed. Split large domain/runtime modules:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Shared architecture boundaries are healthy.");
