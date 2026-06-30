export function inspectLocalRouteAndModalPicks({ lines, rel }, violations) {
  if (rel.startsWith("app/screens/") && !rel.startsWith("app/screens/routeTypes/")) {
    inspectLocalPicks(lines, rel, violations, "Pick<MainScreenProps", "move route prop picks into app/screens/routeTypes/");
  }

  if (rel.startsWith("app/panels/") && !rel.startsWith("app/panels/modalTypes/")) {
    inspectLocalPicks(lines, rel, violations, "Pick<AppPanelProps", "move modal prop picks into app/panels/modalTypes/");
  }

  if (rel.startsWith("app/shellHandlers/") && !rel.startsWith("app/shellHandlers/handlerTypes/")) {
    inspectLocalPicks(lines, rel, violations, "Pick<AppShellHandlerInput", "move shell handler prop picks into app/shellHandlers/handlerTypes/");
  }

  if (rel.startsWith("app/settingsTools/") && !rel.startsWith("app/settingsTools/settingsToolTypes/")) {
    inspectLocalPicks(lines, rel, violations, "Pick<SettingsToolContext", "move settings tool context picks into app/settingsTools/settingsToolTypes/");
  }
}

function inspectLocalPicks(lines, rel, violations, token, message) {
  lines.forEach((line, index) => {
    if (line.includes(token)) violations.localContractPicks.push(`${rel}:${index + 1}: ${message}`);
  });
}
