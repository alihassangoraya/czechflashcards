const wildcardExportPattern = /^\s*export\s+\*\s+from\s+["'][^"']+["'];?/;

export function inspectWildcardExports({ lines, rel }, violations) {
  lines.forEach((line, index) => {
    if (wildcardExportPattern.test(line)) violations.wildcardExports.push(`${rel}:${index + 1}: use named exports for mobile public APIs`);
  });
}
