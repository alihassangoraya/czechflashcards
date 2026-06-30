import type { RawCard } from "./cardNormalize";
import { slug } from "./cardSlug";
import { csvColumnIndex } from "./csvHeaders";

export function mapHeaderCsvCard(values: string[], headers: string[], id: string): RawCard {
  const urIndex = csvColumnIndex(headers, "urdu", "ur");
  const sentenceEnIndex = csvColumnIndex(headers, "sentenceen", "exampleen", "englishsentence", "exampleenglish");
  const tagsIndex = csvColumnIndex(headers, "tags", "tag");
  return {
    id,
    cz: values[csvColumnIndex(headers, "czech", "cz")] || "",
    en: values[csvColumnIndex(headers, "english", "en")] || "",
    hi: values[csvColumnIndex(headers, "hindi", "hi")] || "",
    ur: urIndex >= 0 ? values[urIndex] : "",
    sentence: values[csvColumnIndex(headers, "sentence", "example", "czechsentence")] || "",
    sentenceEn: sentenceEnIndex >= 0 ? values[sentenceEnIndex] : "",
    tags: tagsIndex >= 0 ? values[tagsIndex] : "daily",
    source: "import"
  };
}

export function mapLegacyCsvCard(values: string[], idPrefix: string): RawCard {
  const [cz, en, hi] = values;
  const hasUrduColumn = values.length >= 6;
  const sentenceEn = values.length >= 7 ? values[5] : "";
  const tags = values.length >= 7 ? values[6] : hasUrduColumn ? values[5] : values[4];
  return {
    id: `${idPrefix}-${slug(cz || "card")}`,
    cz,
    en,
    hi,
    ur: hasUrduColumn ? values[3] : "",
    sentence: hasUrduColumn ? values[4] : values[3],
    sentenceEn,
    tags: tags || "daily",
    source: "import"
  };
}
