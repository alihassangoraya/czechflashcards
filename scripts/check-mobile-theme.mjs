import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const mobileRoot = fileURLToPath(new URL("../apps/mobile/", import.meta.url));
const files = [join(mobileRoot, "App.tsx")];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) files.push(path);
  }
}

await collect(join(mobileRoot, "src/features"));

const literalColor = /#[0-9a-f]{3,8}\b|rgba?\(/i;
const violations = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  content.split("\n").forEach((line, index) => {
    if (literalColor.test(line)) violations.push(`${file}:${index + 1}`);
  });
}

if (violations.length) {
  console.error("Move UI color values into apps/mobile/src/theme/design.ts:");
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Mobile UI color tokens are centralized.");
