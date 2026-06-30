import { normalizeCards, parseCsvCards } from "@czech-flashcards/shared";
import { addCardToCustomDeck, importCards, type AppDatabase, type StudySettings } from "../../database";

type CsvImportResult = {
  count: number;
  deckName: string | null;
};

export async function importCsvTextToSettingsDeck(db: AppDatabase, text: string, settings: StudySettings | null): Promise<CsvImportResult | null> {
  const imported = normalizeCards(parseCsvCards(text));
  if (!imported.length) return null;
  const count = await importCards(db, imported);
  const activeCustomDeck = settings?.customDecks.find((deck) => deck.id === settings.deckFilter) || null;
  if (activeCustomDeck) {
    for (const card of imported) await addCardToCustomDeck(db, activeCustomDeck.id, card.id);
  }
  return { count, deckName: activeCustomDeck?.name || null };
}
