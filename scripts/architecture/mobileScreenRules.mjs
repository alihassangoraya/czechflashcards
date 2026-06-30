export function inspectFeatureScreenStyles({ lines, rel }, violations) {
  if (!rel.match(/^(?:features\/[^/]+\/screens\/[^/]+|app\/(?:AppShell|AppPanels|MainScreens))\.tsx$/)) return;

  lines.forEach((line, index) => {
    if (line.includes("StyleSheet.create")) {
      violations.inlineScreenStyles.push(`${rel}:${index + 1}: move shell/screen styles into a sibling style module`);
    }
  });
}
