export function inspectMaterialIconPropTypes({ lines, rel }, violations) {
  if (!rel.startsWith("features/")) return;
  lines.forEach((line, index) => {
    if (line.includes("React.ComponentProps<typeof MaterialIcons>")) {
      violations.materialIconPropTypes.push(`${rel}:${index + 1}: import MaterialIconName from components/MaterialIcons`);
    }
  });
}
