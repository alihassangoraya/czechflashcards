import { relative } from "node:path";
import { allowedThemeTokenImporters, privateThemeTokenPattern } from "./themeStructureConfig.mjs";

export function inspectThemeImports(srcRoot, sourceFiles) {
  const violations = [];

  for (const source of sourceFiles) {
    const rel = relative(srcRoot, source.file);
    if (allowedThemeTokenImporters.some((pattern) => pattern.test(rel))) continue;
    source.lines.forEach((line, index) => {
      if (privateThemeTokenPattern.test(line)) violations.push(`${rel}:${index + 1}: import theme internals through theme/design`);
    });
  }

  return violations;
}
