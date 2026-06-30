export function inspectRootServices({ rel }, violations) {
  if (rel.match(/^services\/[^/]+\.(ts|tsx)$/)) {
    violations.rootServices.push(`${rel}: move service logic into a domain folder under services/`);
  }
}

export function inspectRootPlatformServices({ rel }, violations) {
  if (rel.match(/^(?:speech|notifications(?:\.web)?)\.ts$/)) {
    violations.rootPlatformServices.push(`${rel}: move platform service logic into a domain folder under services/`);
  }
}
