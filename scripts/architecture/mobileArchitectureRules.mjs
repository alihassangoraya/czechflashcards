import {
  canonicalTypeFiles,
  defaultMaxLines,
  hardcodedTextAllowList,
  maxLinesByPath,
  rawCollectionTypeRules
} from "./mobileArchitectureConfig.mjs";
import { inspectLocalRouteAndModalPicks } from "./mobileContractRules.mjs";
import { inspectMaterialIconPropTypes } from "./mobileIconRules.mjs";
import { inspectRootAppModules } from "./mobileRootAppRules.mjs";

export function inspectMobileFile(source, violations) {
  inspectLineCount(source, violations);
  inspectFeaturePlacement(source, violations);
  inspectFeatureHookPlacement(source, violations);
  inspectFeatureText(source, violations);
  inspectAppImports(source, violations);
  inspectFeatureImports(source, violations);
  inspectRootAppModules(source, violations);
  inspectRootServices(source, violations);
  inspectRootPlatformServices(source, violations);
  inspectMaterialIconPropTypes(source, violations);
  inspectCanonicalTypes(source, violations);
  inspectRawCollectionTypes(source, violations);
  inspectLocalRouteAndModalPicks(source, violations);
}

function inspectLineCount({ lines, rel }, violations) {
  const maxLines = maxLinesByPath.get(rel) || defaultMaxLines;
  if (lines.length > maxLines) violations.lineCounts.push(`${rel}: ${lines.length} lines > ${maxLines}`);
}

function inspectFeaturePlacement({ lines, rel }, violations) {
  if (rel.match(/^features\/[^/]+\/[^/]+\.tsx$/)) {
    violations.featureRootComponents.push(`${rel}: move feature UI files into components/ or screens/`);
  }

  if (rel.match(/^features\/[^/]+\/screens\/[^/]+\.tsx$/)) {
    lines.forEach((line, index) => {
      if (line.match(/export function .*:\s*\{/)) violations.inlineScreenProps.push(`${rel}:${index + 1}: use a named screen props type`);
    });
  }
}

function inspectFeatureHookPlacement({ rel }, violations) {
  if (rel.match(/^features\/[^/]+\/use[A-Z].*\.ts$/)) {
    violations.featureRootHooks.push(`${rel}: move feature hooks into hooks/`);
  }
}

function inspectFeatureText({ lines, rel }, violations) {
  if (hardcodedTextAllowList.has(rel) || !rel.startsWith("features/")) return;
  lines.forEach((line, index) => {
    const textMatch = line.match(/<Text[^>]*>([^<{][^<]*[A-Za-z][^<]*)<\/Text>/);
    if (textMatch && !textMatch[1].includes("{")) violations.hardcodedText.push(`${rel}:${index + 1}: ${textMatch[1].trim()}`);
  });
}

function inspectAppImports({ lines, rel }, violations) {
  if (!rel.startsWith("app/")) return;
  lines.forEach((line, index) => {
    if (line.match(/from\s+["'](?:\.\.\/)+features\/[^/"']+\/[^"']+["']/)) {
      violations.appDeepFeatureImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }

    if (rel.match(/^app\/study(?:Queue|Session)\//) && line.match(/from\s+["'](?:\.\.\/)+features\/[^"']+["']/)) {
      violations.studyDomainFeatureImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

function inspectFeatureImports({ lines, rel }, violations) {
  if (!rel.startsWith("features/")) return;
  lines.forEach((line, index) => {
    if (line.match(/from\s+["'](?:\.\.\/)+app\/[^"']+["']/)) {
      violations.featureToAppImports.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

function inspectRootServices({ rel }, violations) {
  if (rel.match(/^services\/[^/]+\.(ts|tsx)$/)) {
    violations.rootServices.push(`${rel}: move service logic into a domain folder under services/`);
  }
}

function inspectRootPlatformServices({ rel }, violations) {
  if (rel.match(/^(?:speech|notifications(?:\.web)?)\.ts$/)) {
    violations.rootPlatformServices.push(`${rel}: move platform service logic into a domain folder under services/`);
  }
}

function inspectCanonicalTypes({ lines, rel }, violations) {
  for (const [typeName, canonicalPath] of canonicalTypeFiles) {
    if (rel === canonicalPath) continue;
    lines.forEach((line, index) => {
      if (line.match(new RegExp(`type\\s+${typeName}\\s*=`))) {
        violations.duplicateTypes.push(`${rel}:${index + 1}: use ${canonicalPath} for ${typeName}`);
      }
    });
  }
}

function inspectRawCollectionTypes({ lines, rel }, violations) {
  if (rel === "services/storage/storageTypes.ts" || rel === "services/sync/supabaseClient.ts") return;
  lines.forEach((line, index) => {
    for (const rule of rawCollectionTypeRules) {
      if (rule.pattern.test(line)) violations.rawCollectionTypes.push(`${rel}:${index + 1}: ${rule.message}`);
    }
  });
}
