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

const literalColor = /#[0-9a-f]{3,8}\b|rgba?\(/i;
const literalFontWeight = /fontWeight:\s*["'][^"']+["']/;
const literalTypographyMetric = /(fontSize|lineHeight):\s*\d/;
const colorViolations = [];
const fontWeightViolations = [];
const typographyMetricViolations = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  content.split("\n").forEach((line, index) => {
    if (literalColor.test(line)) colorViolations.push(`${file}:${index + 1}`);
    if (!fontWeightAllowList.has(file) && literalFontWeight.test(line)) fontWeightViolations.push(`${file}:${index + 1}`);
    if (!fontWeightAllowList.has(file) && literalTypographyMetric.test(line)) typographyMetricViolations.push(`${file}:${index + 1}`);
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

console.log("Mobile UI theme tokens are centralized.");
