export function normalizeTags(tags: unknown): string[] {
  const values = Array.isArray(tags) ? tags : String(tags || "daily").split(/[,\s]+/);
  return Array.from(new Set(values.map((tag) => String(tag).trim()).filter(Boolean)));
}
