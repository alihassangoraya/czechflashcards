export function normalizeCsvHeaders(row) {
  return row.map((cell) => cell.toLowerCase().replace(/[\s_-]+/g, ""));
}

export function hasCsvHeader(headers) {
  return headers.includes("czech") || headers.includes("cz");
}

export function csvColumnIndex(headers, ...names) {
  return names.map((name) => headers.indexOf(name)).find((index) => index >= 0) ?? -1;
}
