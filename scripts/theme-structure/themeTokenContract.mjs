export function inspectThemeTokenContract({ lightColorsSource, darkColorsSource, colorTypesSource }) {
  const violations = [];

  if (!lightColorsSource.includes("lightSemanticColors")) violations.push("lightColors must compose semantic color groups.");
  if (!lightColorsSource.includes("lightCompatibilityColorAliases")) violations.push("lightColors must include compatibility aliases.");
  if (!darkColorsSource.includes("import type { ColorTokens }")) violations.push("darkColors must import ColorTokens.");
  if (!darkColorsSource.includes("export const darkColors: ColorTokens")) violations.push("darkColors must be typed as ColorTokens.");
  if (!darkColorsSource.includes("...lightColors")) violations.push("darkColors must spread lightColors before overrides.");
  if (!colorTypesSource.includes("keyof typeof lightColors")) violations.push("ColorTokens must be derived from lightColors keys.");

  return violations;
}
