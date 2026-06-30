import type { RawCard } from "./cardNormalize";
import { mapHeaderCsvCard, mapLegacyCsvCard } from "./csvCardMapping";
import { hasCsvHeader, normalizeCsvHeaders } from "./csvHeaders";
import { parseCsvRows } from "./csvRows";

export function parseCsvCards(text: string, now = Date.now()): RawCard[] {
  const rows = parseCsvRows(text)
    .filter((row) => row.some(Boolean))
    .map((row) => row.map((part) => (part || "").trim()));

  if (!rows.length) return [];

  const headers = normalizeCsvHeaders(rows[0]);
  const hasHeader = hasCsvHeader(headers);
  const body = hasHeader ? rows.slice(1) : rows;

  return body
    .map((values, index) => (hasHeader ? mapHeaderCsvCard(values, headers, `import-${now}-${index}`) : mapLegacyCsvCard(values, `import-${now}-${index}`)))
    .filter((card) => card.cz && card.en);
}

export { parseCsvRows } from "./csvRows";
