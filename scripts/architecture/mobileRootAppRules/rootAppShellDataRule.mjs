export function inspectRootAppShellData(rel, violations) {
  if (rel === "app/appShellDataProps.ts" || rel === "app/studySummary.ts") {
    violations.rootAppShellData.push(`${rel}: move shell data projection into app/shellData/`);
  }
}
