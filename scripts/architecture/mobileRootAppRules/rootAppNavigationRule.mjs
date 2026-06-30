export function inspectRootAppNavigation(rel, violations) {
  if (rel.match(/^app\/(?:useAppNavigation|useWebRouteSync|webRoutes)\.ts$/)) {
    violations.rootAppNavigation.push(`${rel}: move app navigation modules into app/navigation/`);
  }
}
