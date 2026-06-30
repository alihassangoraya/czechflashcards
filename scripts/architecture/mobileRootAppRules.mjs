export function inspectRootAppModules({ rel }, violations) {
  inspectRootAppData(rel, violations);
  inspectRootAppCards(rel, violations);
  inspectRootAppHandlers(rel, violations);
  inspectRootAppNavigation(rel, violations);
  inspectRootAppSettingsTools(rel, violations);
  inspectRootAppShellData(rel, violations);
  inspectRootAppStudy(rel, violations);
}

function inspectRootAppData(rel, violations) {
  if (rel.match(/^app\/(?:appData.*|appSeed|useAppData)\.ts$/)) {
    violations.rootAppData.push(`${rel}: move app data modules into app/data/`);
  }
}

function inspectRootAppCards(rel, violations) {
  if (rel.match(/^app\/(?:cardFactory|deckFiltering|use(?:Card|CustomWord|DeckMembership|FilteredStudyDeck|SavedCard).*)\.ts$/)) {
    violations.rootAppCards.push(`${rel}: move app card-management modules into app/cards/`);
  }
}

function inspectRootAppHandlers(rel, violations) {
  if (rel.match(/^app\/[^/]+Handlers\.ts$/)) {
    violations.rootAppHandlers.push(`${rel}: move handler composition into a focused folder under app/`);
  }
}

function inspectRootAppNavigation(rel, violations) {
  if (rel.match(/^app\/(?:useAppNavigation|useWebRouteSync|webRoutes)\.ts$/)) {
    violations.rootAppNavigation.push(`${rel}: move app navigation modules into app/navigation/`);
  }
}

function inspectRootAppSettingsTools(rel, violations) {
  if (rel === "app/useSettingsTools.ts") {
    violations.rootAppSettingsTools.push(`${rel}: move app settings tool modules into app/settingsTools/`);
  }
}

function inspectRootAppShellData(rel, violations) {
  if (rel === "app/appShellDataProps.ts") {
    violations.rootAppShellData.push(`${rel}: move shell data projection into app/shellData/`);
  }
}

function inspectRootAppStudy(rel, violations) {
  if (rel.match(/^app\/useStudy(?:Queue|Session)\.ts$/)) {
    violations.rootAppStudy.push(`${rel}: move app study modules into app/study/, app/studyQueue/, or app/studySession/`);
  }
}
