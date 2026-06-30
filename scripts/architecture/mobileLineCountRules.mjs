import { defaultMaxLines, maxLinesByPath } from "./mobileArchitectureConfig.mjs";

export function inspectLineCount({ lines, rel }, violations) {
  const maxLines = maxLinesByPath.get(rel) || defaultMaxLines;
  if (lines.length > maxLines) violations.lineCounts.push(`${rel}: ${lines.length} lines > ${maxLines}`);
}
