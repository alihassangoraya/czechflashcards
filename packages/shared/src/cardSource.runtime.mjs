export function normalizeSource(source) {
  return source === "custom" || source === "import" || source === "seed" ? source : "legacy-web";
}
