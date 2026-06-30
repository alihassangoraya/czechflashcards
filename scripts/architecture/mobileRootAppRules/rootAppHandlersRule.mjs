export function inspectRootAppHandlers(rel, violations) {
  if (rel.match(/^app\/[^/]+Handlers\.ts$/)) {
    violations.rootAppHandlers.push(`${rel}: move handler composition into a focused folder under app/`);
  }
}
