const guardedFeatureRoots = ["account", "decks", "home", "quiz", "settings", "study", "words"];

export function inspectFocusedFeatureRoots({ rel }, violations) {
  const match = rel.match(/^features\/([^/]+)\/(?!index\.ts$)[^/]+\.(ts|tsx)$/);
  if (!match || !guardedFeatureRoots.includes(match[1])) return;

  violations.focusedFeatureRoots.push(`${rel}: keep feature internals under focused folders`);
}
