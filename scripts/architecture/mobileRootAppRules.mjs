import {
  inspectRootAppCards,
  inspectRootAppData,
  inspectRootAppFeedback,
  inspectRootAppHandlers,
  inspectRootAppNavigation,
  inspectRootAppSettingsTools,
  inspectRootAppShellData,
  inspectRootAppStudy,
  inspectRootContractFiles
} from "./mobileRootAppRules/index.mjs";

function inspectAppDataStateComposition({ lines, rel }, violations) {
  if (rel !== "app/data/appDataState.ts") return;

  lines.forEach((line, index) => {
    if (line.includes("useState")) {
      violations.appDataStateComposition.push(`${rel}:${index + 1}: keep app data state split into focused domain hooks`);
    }
  });
}

export function inspectRootAppModules(source, violations) {
  const { rel } = source;
  inspectRootAppData(rel, violations);
  inspectRootAppCards(rel, violations);
  inspectRootAppHandlers(rel, violations);
  inspectRootAppFeedback(rel, violations);
  inspectRootAppNavigation(rel, violations);
  inspectRootAppSettingsTools(rel, violations);
  inspectRootAppShellData(rel, violations);
  inspectRootAppStudy(rel, violations);
  inspectAppDataStateComposition(source, violations);
  inspectRootContractFiles(rel, violations);
}
