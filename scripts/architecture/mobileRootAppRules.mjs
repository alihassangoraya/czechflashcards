import {
  inspectRootAppCards,
  inspectRootAppData,
  inspectRootAppFeedback,
  inspectRootAppHandlers,
  inspectRootAppNavigation,
  inspectRootAppSettingsTools,
  inspectRootAppShellData,
  inspectRootAppStudy
} from "./mobileRootAppRules/index.mjs";

export function inspectRootAppModules({ rel }, violations) {
  inspectRootAppData(rel, violations);
  inspectRootAppCards(rel, violations);
  inspectRootAppHandlers(rel, violations);
  inspectRootAppFeedback(rel, violations);
  inspectRootAppNavigation(rel, violations);
  inspectRootAppSettingsTools(rel, violations);
  inspectRootAppShellData(rel, violations);
  inspectRootAppStudy(rel, violations);
}
