export function inspectMaterialIconPropTypes({ lines, rel }, violations) {
  if (rel === "components/materialIconGlyphs.ts") {
    violations.materialIconPrivateImports.push(`${rel}: keep glyph registry inside components/materialIconGlyphs/`);
  }

  if (!rel.startsWith("features/") && !rel.startsWith("app/")) return;
  lines.forEach((line, index) => {
    if (line.includes("React.ComponentProps<typeof MaterialIcons>")) {
      violations.materialIconPropTypes.push(`${rel}:${index + 1}: import MaterialIconName from components/MaterialIcons`);
    }

    if (line.match(/from\s+["'](?:\.\.\/)+(?:components\/)?materialIconGlyphs(?:\/[^"']+)?["']/)) {
      violations.materialIconPrivateImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}
