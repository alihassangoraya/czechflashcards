import { canonicalTypeFiles, rawCollectionTypeRules } from "./mobileArchitectureConfig/index.mjs";

export function inspectCanonicalTypes({ lines, rel }, violations) {
  for (const [typeName, canonicalPath] of canonicalTypeFiles) {
    if (rel === canonicalPath) continue;
    lines.forEach((line, index) => {
      if (line.match(new RegExp(`type\\s+${typeName}\\s*=`))) {
        violations.duplicateTypes.push(`${rel}:${index + 1}: use ${canonicalPath} for ${typeName}`);
      }
    });
  }
}

export function inspectRawCollectionTypes({ lines, rel }, violations) {
  if (rel.startsWith("services/storage/storageTypes/") || rel === "services/sync/supabaseClient.ts") return;
  lines.forEach((line, index) => {
    for (const rule of rawCollectionTypeRules) {
      if (rule.pattern.test(line)) violations.rawCollectionTypes.push(`${rel}:${index + 1}: ${rule.message}`);
    }
  });
}
