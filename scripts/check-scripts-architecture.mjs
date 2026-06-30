import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const scriptsRoot = join(root, "scripts");
const maxLines = 120;
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    if (entry.isFile() && /\.(js|mjs)$/.test(entry.name)) files.push(path);
  }
}

await collect(scriptsRoot);

const violations = [];
for (const file of files) {
  const lineCount = (await readFile(file, "utf8")).split("\n").length;
  if (lineCount > maxLines) violations.push(`${relative(scriptsRoot, file)}: ${lineCount} lines > ${maxLines}`);
}

if (violations.length) {
  console.error("Scripts architecture check failed. Split large maintenance scripts:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Scripts architecture boundaries are healthy.");
