export function normalizeCsvHeaders(row: string[]): string[] {
  return row.map((cell) => cell.toLowerCase().replace(/[\s_-]+/g, ""));
}

export function hasCsvHeader(headers: string[]): boolean {
  return headers.includes("czech") || headers.includes("cz");
}

export function csvColumnIndex(headers: string[], ...names: string[]): number {
  return names.map((name) => headers.indexOf(name)).find((index) => index >= 0) ?? -1;
}
