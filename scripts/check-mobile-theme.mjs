import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const mobileRoot = fileURLToPath(new URL("../apps/mobile/", import.meta.url));
const files = [join(mobileRoot, "App.tsx")];
const fontWeightAllowList = new Set([
  join(mobileRoot, "src/components/MaterialIcons.tsx")
]);

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) files.push(path);
  }
}

await collect(join(mobileRoot, "src/features"));
await collect(join(mobileRoot, "src/components"));
await collect(join(mobileRoot, "src/app"));

const literalColor = /#[0-9a-f]{3,8}\b|rgba?\(/i;
const literalFontWeight = /fontWeight:\s*["'][^"']+["']/;
const literalTypographyMetric = /(fontSize|lineHeight):\s*\d/;
const literalLayoutMetric = /\b(gap|rowGap|columnGap|margin|marginTop|marginBottom|marginHorizontal|marginVertical|marginLeft|marginRight|padding|paddingTop|paddingBottom|paddingHorizontal|paddingVertical|paddingLeft|paddingRight|width|height|minWidth|maxWidth|minHeight|maxHeight|borderRadius|borderWidth|borderTopWidth|borderBottomWidth|top|left|right|bottom|zIndex):\s*(-?\d+(?:\.\d+)?)/;
const literalMotionMetric = /\b(duration|perspective):\s*(-?\d+(?:\.\d+)?)/;
const literalIconSize = /\bsize=\{(\d+(?:\.\d+)?)\}/;
const colorViolations = [];
const fontWeightViolations = [];
const typographyMetricViolations = [];
const layoutMetricViolations = [];
const motionMetricViolations = [];
const iconSizeViolations = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  content.split("\n").forEach((line, index) => {
    if (literalColor.test(line)) colorViolations.push(`${file}:${index + 1}`);
    if (!fontWeightAllowList.has(file) && literalFontWeight.test(line)) fontWeightViolations.push(`${file}:${index + 1}`);
    if (!fontWeightAllowList.has(file) && literalTypographyMetric.test(line)) typographyMetricViolations.push(`${file}:${index + 1}`);
    const layoutMatch = line.match(literalLayoutMetric);
    if (layoutMatch && Number(layoutMatch[2]) !== 0) layoutMetricViolations.push(`${file}:${index + 1}`);
    const motionMatch = line.match(literalMotionMetric);
    if (motionMatch && Number(motionMatch[2]) !== 0) motionMetricViolations.push(`${file}:${index + 1}`);
    const iconSizeMatch = line.match(literalIconSize);
    if (iconSizeMatch && Number(iconSizeMatch[1]) !== 0) iconSizeViolations.push(`${file}:${index + 1}`);
  });
}

if (colorViolations.length) {
  console.error("Move UI color values into apps/mobile/src/theme/design.ts:");
  console.error(colorViolations.join("\n"));
  process.exit(1);
}

if (fontWeightViolations.length) {
  console.error("Move UI font weights into apps/mobile/src/theme/design.ts:");
  console.error(fontWeightViolations.join("\n"));
  process.exit(1);
}

if (typographyMetricViolations.length) {
  console.error("Move UI font sizes and line heights into apps/mobile/src/theme/design.ts:");
  console.error(typographyMetricViolations.join("\n"));
  process.exit(1);
}

if (layoutMetricViolations.length) {
  console.error("Move UI spacing and dimension values into apps/mobile/src/theme/design.ts:");
  console.error(layoutMetricViolations.join("\n"));
  process.exit(1);
}

if (motionMetricViolations.length) {
  console.error("Move UI motion values into apps/mobile/src/theme/design.ts:");
  console.error(motionMetricViolations.join("\n"));
  process.exit(1);
}

if (iconSizeViolations.length) {
  console.error("Move UI icon sizes into apps/mobile/src/theme/design.ts:");
  console.error(iconSizeViolations.join("\n"));
  process.exit(1);
}

console.log("Mobile UI theme tokens are centralized.");
