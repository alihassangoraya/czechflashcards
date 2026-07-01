import { lightColors } from "./tokens/lightColors";
import type { ColorTokens } from "./tokens/colorTypes";
import type { ThemeMode } from "./tokens/themeFactory";
import { getTheme } from "./tokens/themeFactory";

function colorVariableName(key: string): string {
  return `--app-color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

export const webColors = Object.fromEntries(
  Object.keys(lightColors).map((key) => [key, `var(${colorVariableName(key)})`])
) as ColorTokens;

export function applyWebThemeVariables(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  const colors = getTheme(mode).colors;
  for (const key of Object.keys(colors) as Array<keyof ColorTokens>) {
    document.documentElement.style.setProperty(colorVariableName(key), colors[key]);
  }
  document.documentElement.style.setProperty("--app-background", colors.background);
  document.documentElement.style.backgroundColor = colors.background;
  document.body.style.backgroundColor = colors.background;
  document.getElementById("root")?.style.setProperty("background-color", colors.background);
}
