export function parseWordPair(pair) {
  const separator = pair.indexOf(":");
  if (separator < 1) return null;
  const cz = pair.slice(0, separator).trim();
  const en = pair.slice(separator + 1).trim();
  return cz && en ? { cz, en } : null;
}
