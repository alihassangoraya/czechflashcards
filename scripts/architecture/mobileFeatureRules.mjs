import { hardcodedTextAllowList } from "./mobileArchitectureConfig/index.mjs";

export function inspectFeaturePlacement({ lines, rel }, violations) {
  if (rel.match(/^features\/[^/]+\/[^/]+\.tsx$/)) {
    violations.featureRootComponents.push(`${rel}: move feature UI files into components/ or screens/`);
  }

  if (rel.match(/^features\/[^/]+\/screens\/[^/]+\.tsx$/)) {
    lines.forEach((line, index) => {
      if (line.match(/export function .*:\s*\{/)) violations.inlineScreenProps.push(`${rel}:${index + 1}: use a named screen props type`);
    });
  }
}

export function inspectFeatureHookPlacement({ rel }, violations) {
  if (rel.match(/^features\/[^/]+\/use[A-Z].*\.ts$/)) {
    violations.featureRootHooks.push(`${rel}: move feature hooks into hooks/`);
  }
}

export function inspectHomeFeatureRoot({ rel }, violations) {
  if (rel.match(/^features\/home\/(?!index\.ts$)[^/]+\.(ts|tsx)$/)) {
    violations.homeRootModules.push(`${rel}: keep home internals under components/, hooks/, models/, screens/, or types/`);
  }
}

export function inspectFeatureText({ lines, rel }, violations) {
  if (hardcodedTextAllowList.has(rel) || !rel.startsWith("features/")) return;
  lines.forEach((line, index) => {
    const textMatch = line.match(/<Text[^>]*>([^<{][^<]*[A-Za-z][^<]*)<\/Text>/);
    if (textMatch && !textMatch[1].includes("{")) violations.hardcodedText.push(`${rel}:${index + 1}: ${textMatch[1].trim()}`);
  });
}
