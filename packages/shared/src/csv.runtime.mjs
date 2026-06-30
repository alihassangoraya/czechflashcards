import { mapHeaderCsvCard, mapLegacyCsvCard } from "./csvCardMapping.runtime.mjs";
import { hasCsvHeader, normalizeCsvHeaders } from "./csvHeaders.runtime.mjs";
import { parseCsvRows } from "./csvRows.runtime.mjs";

export function parseCsvCards(text, now = Date.now()) {
  const rows = parseCsvRows(text).filter((row) => row.some(Boolean)).map((row) => row.map((part) => (part || "").trim()));
  if (!rows.length) return [];

  const headers = normalizeCsvHeaders(rows[0]);
  const hasHeader = hasCsvHeader(headers);
  const body = hasHeader ? rows.slice(1) : rows;

  return body
    .map((values, index) => (hasHeader ? mapHeaderCsvCard(values, headers, `import-${now}-${index}`) : mapLegacyCsvCard(values, `import-${now}-${index}`)))
    .filter((card) => card.cz && card.en);
}

export { parseCsvRows } from "./csvRows.runtime.mjs";
