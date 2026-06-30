import { mapWithConcurrency } from "./concurrentMap.mjs";
import { missingUrduCards } from "./urduFillSelection.mjs";
import { translateToUrdu } from "./urduTranslator.mjs";

export async function fillMissingUrdu(cards, overrides, limit) {
  const missing = missingUrduCards(cards, overrides, limit);
  if (!missing.length) return [];

  const translated = await mapWithConcurrency(missing, 3, async (card) => ({
    cz: card.cz,
    ur: await translateToUrdu(card.en || card.cz)
  }));

  for (const entry of translated) overrides[entry.cz] = entry.ur;
  return translated;
}
