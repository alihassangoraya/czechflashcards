export function inspectAppImports({ lines, rel }, violations) {
  if (!rel.startsWith("app/")) return;
  lines.forEach((line, index) => {
    if (line.match(/from\s+["'](?:\.\.\/)+features\/[^/"']+\/[^"']+["']/)) {
      violations.appDeepFeatureImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }

    if (rel.match(/^app\/study(?:Queue|Session)\//) && line.match(/from\s+["'](?:\.\.\/)+features\/[^"']+["']/)) {
      violations.studyDomainFeatureImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

export function inspectFeatureImports({ lines, rel }, violations) {
  if (!rel.startsWith("features/")) return;
  lines.forEach((line, index) => {
    if (line.match(/from\s+["'](?:\.\.\/)+app\/[^"']+["']/)) {
      violations.featureToAppImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}
