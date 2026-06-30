export function inspectRootAppData(rel, violations) {
  if (rel.match(/^app\/(?:appData.*|appSeed|useAppData|useAuthActions)\.ts$/)) {
    violations.rootAppData.push(`${rel}: move app data modules into app/data/`);
  }
}
