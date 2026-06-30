export function inspectFeatureScreenStyles({ lines, rel }, violations) {
  if (!rel.match(/^(?:features\/[^/]+\/screens\/[^/]+|app\/(?:AppShell|AppPanels|MainScreens))\.tsx$/)) return;

  lines.forEach((line, index) => {
    if (line.includes("StyleSheet.create")) {
      violations.inlineScreenStyles.push(`${rel}:${index + 1}: move shell/screen styles into a sibling style module`);
    }
  });
}

export function inspectSharedComponentContracts({ lines, rel }, violations) {
  if (!rel.match(/^components\/[A-Z][^/]+\.tsx$/)) return;

  lines.forEach((line, index) => {
    if (line.includes("StyleSheet.create")) {
      violations.sharedComponentContracts.push(`${rel}:${index + 1}: move shared component styles into a sibling style module`);
    }

    if (line.match(/export function .*:\s*\{/)) {
      violations.sharedComponentContracts.push(`${rel}:${index + 1}: use a named shared component props type`);
    }
  });
}
