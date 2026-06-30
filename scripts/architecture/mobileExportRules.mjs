export function inspectDefaultExports({ lines, rel }, violations) {
  if (rel === "App.tsx") return;
  if (!rel.match(/\.(ts|tsx)$/) || rel.endsWith(".d.ts")) return;

  lines.forEach((line, index) => {
    if (line.match(/\bexport\s+default\b/)) {
      violations.defaultExports.push(`${rel}:${index + 1}: use named exports for app modules`);
    }
  });
}
