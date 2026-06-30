import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { relative, join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcRoot = join(root, "apps/mobile/src");
const defaultMaxLines = 140;
const maxLinesByPath = new Map([
  ["i18n/locales/en.ts", 260],
  ["i18n/locales/cs.ts", 220],
  ["i18n/locales/hi.ts", 220],
  ["i18n/locales/ur.ts", 220]
]);
const ignoredDirectories = new Set(["assets", "dist", "node_modules"]);
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) files.push(path);
  }
}

await collect(srcRoot);

const violations = [];
for (const file of files) {
  const rel = relative(srcRoot, file);
  const maxLines = maxLinesByPath.get(rel) || defaultMaxLines;
  const lines = (await readFile(file, "utf8")).split("\n").length;
  if (lines > maxLines) violations.push(`${rel}: ${lines} lines > ${maxLines}`);
}

if (violations.length) {
  console.error("Mobile architecture check failed. Split large files into focused modules:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Mobile architecture file-size boundaries are healthy.");
