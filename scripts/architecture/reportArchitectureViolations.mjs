const mobileViolationMessages = [
  ["hardcodedText", "Mobile architecture check failed. Move hardcoded UI text into i18n translations:"],
  ["appDeepFeatureImports", "Mobile architecture check failed. App orchestration must import features through feature barrels:"],
  ["featureToAppImports", "Mobile architecture check failed. Feature modules must not import app orchestration:"],
  ["studyDomainFeatureImports", "Mobile architecture check failed. Study queue/session domain modules must not import feature UI modules:"],
  ["featureRootComponents", "Mobile architecture check failed. Feature UI files must live in components/ or screens/:"],
  ["inlineScreenProps", "Mobile architecture check failed. Feature screens must use named props types:"],
  ["lineCounts", "Mobile architecture check failed. Split large files into focused modules:"],
  ["duplicateTypes", "Mobile architecture check failed. Reuse canonical shared type aliases:"],
  ["localeSections", "Mobile architecture check failed. Keep i18n catalogs split into matching feature sections:"],
  ["rootAppData", "Mobile architecture check failed. App data boot/sync/state modules must live under app/data/:"],
  ["rootAppCards", "Mobile architecture check failed. App card-management modules must live under app/cards/:"],
  ["rootAppHandlers", "Mobile architecture check failed. App shell handlers must live under app/shellHandlers/:"],
  ["rootAppNavigation", "Mobile architecture check failed. App navigation and route modules must live under app/navigation/:"],
  ["rootAppSettingsTools", "Mobile architecture check failed. App settings tool modules must live under app/settingsTools/:"],
  ["rootAppShellData", "Mobile architecture check failed. App shell data projection must live under app/shellData/:"],
  ["rootAppStudy", "Mobile architecture check failed. App study modules must live under focused study folders:"],
  ["rootServices", "Mobile architecture check failed. Service implementations must live in domain service folders:"]
];

export function reportMobileArchitectureViolations(violations) {
  let failed = false;
  for (const [key, message] of mobileViolationMessages) {
    if (!violations[key].length) continue;
    failed = true;
    console.error(message);
    console.error(violations[key].join("\n"));
  }

  if (failed) process.exit(1);
}
