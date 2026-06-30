export function inspectRootAppSettingsTools(rel, violations) {
  if (rel === "app/useSettingsTools.ts") {
    violations.rootAppSettingsTools.push(`${rel}: move app settings tool modules into app/settingsTools/`);
  }
}
