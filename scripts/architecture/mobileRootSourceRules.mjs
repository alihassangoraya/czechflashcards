import { allowedRootSourceFiles } from "./mobileArchitectureConfig/index.mjs";

export function inspectRootSourceFile({ rel }, violations) {
  if (rel.includes("/")) return;
  if (allowedRootSourceFiles.has(rel)) return;
  violations.rootSourceFiles.push(`${rel}: move root source modules into app/, features/, services/, theme/, or i18n/`);
}
