export function inspectRootServices({ lines, rel }, violations) {
  if (rel.match(/^services\/[^/]+\.(ts|tsx)$/)) {
    violations.rootServices.push(`${rel}: move service logic into a domain folder under services/`);
  }

  if (!["database.ts", "database.web.ts", "sync.ts"].includes(rel)) return;
  lines.forEach((line, index) => {
    if (line.match(/from\s+["']\.\/services\/[^"']+\/[^"']+["']/)) {
      violations.rootServices.push(`${rel}:${index + 1}: import root service facades through domain service barrels`);
    }
  });
}

export function inspectRootPlatformServices({ rel }, violations) {
  if (rel.match(/^(?:speech|notifications(?:\.web)?)\.ts$/)) {
    violations.rootPlatformServices.push(`${rel}: move platform service logic into a domain folder under services/`);
  }
}
