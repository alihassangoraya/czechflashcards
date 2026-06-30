export function inspectRootContractFiles(rel, violations) {
  if (rel.match(/^app\/(?:screens\/screenTypes|panels\/panelTypes)\.ts$/)) {
    violations.rootContractFiles.push(`${rel}: keep composed contracts inside their contract folder`);
  }
}
