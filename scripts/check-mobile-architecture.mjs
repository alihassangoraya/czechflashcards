import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";
import { collectSourceFiles, readSourceFile } from "./architecture/fileCollection.mjs";
import { ignoredMobileDirectories } from "./architecture/mobileArchitectureConfig/index.mjs";
import { inspectLocaleSections } from "./architecture/mobileLocaleRules.mjs";
import { inspectMobileFile } from "./architecture/mobileArchitectureRules.mjs";
import { createMobileArchitectureViolations } from "./architecture/mobileViolationState.mjs";
import { reportMobileArchitectureViolations } from "./architecture/reportArchitectureViolations.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const mobileRoot = join(root, "apps/mobile");
const srcRoot = join(root, "apps/mobile/src");
const rootFiles = [join(mobileRoot, "App.tsx")];

const files = await collectSourceFiles(srcRoot, {
  extensionPattern: /\.(ts|tsx)$/,
  ignoredDirectories: ignoredMobileDirectories
});
const violations = createMobileArchitectureViolations();

for (const file of rootFiles) {
  inspectMobileFile(await readSourceFile(mobileRoot, file), violations);
}

for (const file of files) {
  inspectMobileFile(await readSourceFile(srcRoot, file), violations);
}

inspectLocaleSections(files.map((file) => relative(srcRoot, file)), violations);
reportMobileArchitectureViolations(violations);

console.log("Mobile architecture boundaries are healthy.");
