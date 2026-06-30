const wildcardExportPattern = /^\s*export\s+\*\s+from\s+["'][^"']+["'];?/;

export function inspectSharedSource({ content, rel }, violations) {
  const lines = content.split("\n");
  const wildcardLine = lines.findIndex((line) => wildcardExportPattern.test(line));
  if (wildcardLine >= 0) violations.push(`${rel}:${wildcardLine + 1}: use named exports for shared public APIs`);
}
