import type { Card } from "./types";
import { slug } from "./cards";

export function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);
  return rows;
}

export function parseCsvCards(text: string, now = Date.now()): Partial<Card>[] {
  const rows = parseCsvRows(text)
    .filter((row) => row.some(Boolean))
    .map((row) => row.map((part) => (part || "").trim()));

  if (!rows.length) return [];

  const headers = rows[0].map((cell) => cell.toLowerCase().replace(/[\s_-]+/g, ""));
  const hasHeader = headers.includes("czech") || headers.includes("cz");
  const body = hasHeader ? rows.slice(1) : rows;
  const indexOf = (...names: string[]) => names.map((name) => headers.indexOf(name)).find((index) => index >= 0) ?? -1;

  return body
    .map((values, index) => {
      if (hasHeader) {
        const czIndex = indexOf("czech", "cz");
        const enIndex = indexOf("english", "en");
        const hiIndex = indexOf("hindi", "hi");
        const urIndex = indexOf("urdu", "ur");
        const sentenceIndex = indexOf("sentence", "example", "czechsentence");
        const sentenceEnIndex = indexOf("sentenceen", "exampleen", "englishsentence", "exampleenglish");
        const tagsIndex = indexOf("tags", "tag");
        return {
          id: `import-${now}-${index}`,
          cz: values[czIndex] || "",
          en: values[enIndex] || "",
          hi: values[hiIndex] || "",
          ur: urIndex >= 0 ? values[urIndex] : "",
          sentence: values[sentenceIndex] || "",
          sentenceEn: sentenceEnIndex >= 0 ? values[sentenceEnIndex] : "",
          tags: tagsIndex >= 0 ? values[tagsIndex] : "daily",
          source: "import"
        };
      }

      const [cz, en, hi] = values;
      const hasUrduColumn = values.length >= 6;
      const ur = hasUrduColumn ? values[3] : "";
      const sentence = hasUrduColumn ? values[4] : values[3];
      const sentenceEn = values.length >= 7 ? values[5] : "";
      const tags = values.length >= 7 ? values[6] : hasUrduColumn ? values[5] : values[4];
      return { id: `import-${now}-${index}-${slug(cz || "card")}`, cz, en, hi, ur, sentence, sentenceEn, tags: tags || "daily", source: "import" };
    })
    .filter((card) => card.cz && card.en);
}
