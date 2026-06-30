import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { relative, join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcRoot = join(root, "apps/mobile/src");
const defaultMaxLines = 100;
const maxLinesByPath = new Map([
  ["i18n/locales/en.ts", 340],
  ["i18n/locales/cs.ts", 220],
  ["i18n/locales/hi.ts", 220],
  ["i18n/locales/ur.ts", 220],
  ["theme/tokens/colors.ts", 120]
]);
const hardcodedTextAllowList = new Set([
  "features/home/homeContent.ts",
  "features/words/wordDecks.ts",
  "features/settings/settingsFormat.ts",
  "components/MaterialIcons.tsx",
  "services/geminiTutor.ts"
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
const hardcodedTextViolations = [];
const deepFeatureImportViolations = [];
const featureToAppImportViolations = [];
for (const file of files) {
  const rel = relative(srcRoot, file);
  const maxLines = maxLinesByPath.get(rel) || defaultMaxLines;
  const content = await readFile(file, "utf8");
  const lines = content.split("\n");
  if (lines.length > maxLines) violations.push(`${rel}: ${lines.length} lines > ${maxLines}`);

  if (!hardcodedTextAllowList.has(rel) && rel.startsWith("features/")) {
    lines.forEach((line, index) => {
      const textMatch = line.match(/<Text[^>]*>([^<{][^<]*[A-Za-z][^<]*)<\/Text>/);
      if (textMatch && !textMatch[1].includes("{")) hardcodedTextViolations.push(`${rel}:${index + 1}: ${textMatch[1].trim()}`);
    });
  }

  if (rel.startsWith("app/")) {
    lines.forEach((line, index) => {
      const deepFeatureImport = line.match(/from\s+["'](?:\.\.\/)+features\/[^/"']+\/[^"']+["']/);
      if (deepFeatureImport) deepFeatureImportViolations.push(`${rel}:${index + 1}: ${line.trim()}`);
    });
  }

  if (rel.startsWith("features/")) {
    lines.forEach((line, index) => {
      const appImport = line.match(/from\s+["'](?:\.\.\/)+app\/[^"']+["']/);
      if (appImport) featureToAppImportViolations.push(`${rel}:${index + 1}: ${line.trim()}`);
    });
  }
}

let failed = false;

if (hardcodedTextViolations.length) {
  failed = true;
  console.error("Mobile architecture check failed. Move hardcoded UI text into i18n translations:");
  console.error(hardcodedTextViolations.join("\n"));
}

if (deepFeatureImportViolations.length) {
  failed = true;
  console.error("Mobile architecture check failed. App orchestration must import features through feature barrels:");
  console.error(deepFeatureImportViolations.join("\n"));
}

if (featureToAppImportViolations.length) {
  failed = true;
  console.error("Mobile architecture check failed. Feature modules must not import app orchestration:");
  console.error(featureToAppImportViolations.join("\n"));
}

if (violations.length) {
  failed = true;
  console.error("Mobile architecture check failed. Split large files into focused modules:");
  console.error(violations.join("\n"));
}

if (failed) process.exit(1);

console.log("Mobile architecture boundaries are healthy.");
