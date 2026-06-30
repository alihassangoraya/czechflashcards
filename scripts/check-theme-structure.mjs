import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { collectSourceFiles, readSourceFile } from "./architecture/fileCollection.mjs";
import { inspectThemeImports } from "./theme-structure/themeImportInspector.mjs";
import { inspectThemeTokenContract } from "./theme-structure/themeTokenContract.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcRoot = join(root, "apps/mobile/src");
const files = await collectSourceFiles(srcRoot, { extensionPattern: /\.(ts|tsx)$/ });
const sources = await Promise.all(files.map((file) => readSourceFile(srcRoot, file)));
const tokenRoot = join(srcRoot, "theme/tokens");

const violations = [
  ...inspectThemeTokenContract({
    lightColorsSource: await readFile(join(tokenRoot, "lightColors.ts"), "utf8"),
    darkColorsSource: await readFile(join(tokenRoot, "darkColors.ts"), "utf8"),
    colorTypesSource: await readFile(join(tokenRoot, "colorTypes.ts"), "utf8")
  }),
  ...inspectThemeImports(srcRoot, sources)
];

if (violations.length) {
  console.error("Theme structure check failed:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Theme structure supports shared light and dark tokens.");
