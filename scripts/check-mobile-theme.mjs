import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { collectSourceFiles, readSourceFile } from "./architecture/fileCollection.mjs";
import { inspectMobileThemeFile } from "./architecture/mobileThemeRules.mjs";
import { createMobileThemeViolations, reportMobileThemeViolations } from "./architecture/mobileThemeViolationState.mjs";

const mobileRoot = fileURLToPath(new URL("../apps/mobile/", import.meta.url));
const fontWeightAllowList = new Set([
  join(mobileRoot, "src/components/MaterialIcons.tsx")
]);
const themeRoots = ["src/features", "src/components", "src/app"];

const files = [join(mobileRoot, "App.tsx")];

for (const root of themeRoots) {
  files.push(...await collectSourceFiles(join(mobileRoot, root), { extensionPattern: /\.(ts|tsx)$/ }));
}

const violations = createMobileThemeViolations();

for (const file of files) {
  inspectMobileThemeFile(await readSourceFile(mobileRoot, file), violations, {
    allowFontWeightLiterals: fontWeightAllowList.has(file)
  });
}

reportMobileThemeViolations(violations);

console.log("Mobile UI theme tokens are centralized.");
