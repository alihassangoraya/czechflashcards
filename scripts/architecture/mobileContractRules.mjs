export function inspectLocalRouteAndModalPicks({ lines, rel }, violations) {
  if (rel.startsWith("app/screens/") && rel !== "app/screens/routeTypes.ts") {
    inspectLocalPicks(lines, rel, violations, "Pick<MainScreenProps", "move route prop picks into app/screens/routeTypes.ts");
  }

  if (rel.startsWith("app/panels/") && rel !== "app/panels/modalTypes.ts") {
    inspectLocalPicks(lines, rel, violations, "Pick<AppPanelProps", "move modal prop picks into app/panels/modalTypes.ts");
  }
}

function inspectLocalPicks(lines, rel, violations, token, message) {
  lines.forEach((line, index) => {
    if (line.includes(token)) violations.localContractPicks.push(`${rel}:${index + 1}: ${message}`);
  });
}
