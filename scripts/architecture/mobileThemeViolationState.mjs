const themeViolationMessages = [
  ["colors", "Move UI color values into apps/mobile/src/theme/design.ts:"],
  ["fontWeights", "Move UI font weights into apps/mobile/src/theme/design.ts:"],
  ["typographyMetrics", "Move UI font sizes and line heights into apps/mobile/src/theme/design.ts:"],
  ["letterSpacing", "Letter spacing must remain 0 in mobile UI:"],
  ["layoutMetrics", "Move UI spacing and dimension values into apps/mobile/src/theme/design.ts:"],
  ["motionMetrics", "Move UI motion values into apps/mobile/src/theme/design.ts:"],
  ["iconSizes", "Move UI icon sizes into apps/mobile/src/theme/design.ts:"]
];

export function createMobileThemeViolations() {
  return {
    colors: [],
    fontWeights: [],
    typographyMetrics: [],
    letterSpacing: [],
    layoutMetrics: [],
    motionMetrics: [],
    iconSizes: []
  };
}

export function reportMobileThemeViolations(violations) {
  let failed = false;

  for (const [key, message] of themeViolationMessages) {
    if (!violations[key].length) continue;
    failed = true;
    console.error(message);
    console.error(violations[key].join("\n"));
  }

  if (failed) process.exit(1);
}
