import { normalizeCards, parseCsvCards, type Card } from "@czech-flashcards/shared";
import {
  exportBackup,
  importCards,
  markCardsDueNow,
  restoreBackup,
  seedCards,
  type AppDatabase,
  type StudySettings
} from "../database";
import { downloadJson, pickTextFile } from "../services/fileTransfer";
import { seedCardsNormalized } from "./appSeed";

type Props = {
  db: AppDatabase | null;
  deck: Card[];
  settings: StudySettings | null;
  setSettingsState: (settings: StudySettings) => void;
  setSettingsNotice: (message: string) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  shuffleDueCards: (onNotice: (message: string) => void) => void;
  clearShuffledDueQueue: () => void;
  forceDeckRefresh: () => void;
};

export function useSettingsTools({ db, deck, settings, setSettingsState, setSettingsNotice, refresh, shuffleDueCards, clearShuffledDueQueue, forceDeckRefresh }: Props) {
  function shuffleDueCardsInDeck() {
    shuffleDueCards(setSettingsNotice);
    forceDeckRefresh();
  }

  async function reviewAllNow() {
    if (!db) return;
    const count = await markCardsDueNow(db, deck.map((card) => card.id));
    clearShuffledDueQueue();
    setSettingsNotice(count ? `${count} cards in this deck are due now.` : "There are no cards in this deck.");
    await refresh(db);
  }

  async function exportProgress() {
    if (!db) return;
    const ok = downloadJson("czech-flashcards-progress.json", exportBackup(db));
    setSettingsNotice(ok ? "Progress backup exported." : "Export is available in the web app. Native sharing needs a document/share module.");
  }

  function exportCurrentDeck() {
    if (!settings) return;
    const payload = {
      exportedAt: new Date().toISOString(),
      exam: settings.examLevel,
      deck: settings.deckFilter,
      cards: deck.map((card) => ({
        id: card.id,
        level: card.level,
        cz: card.cz,
        en: card.en,
        hi: card.hi,
        ur: card.ur,
        sentence: card.sentence,
        sentenceEn: card.sentenceEn,
        pronunciation: card.pronunciation,
        synonyms: card.synonyms,
        antonyms: card.antonyms,
        grammar: card.grammar,
        googleCategory: card.googleCategory,
        tags: card.tags
      }))
    };
    const ok = downloadJson(`czech-${settings.examLevel}-${settings.deckFilter}-deck.json`, payload);
    setSettingsNotice(ok ? `Exported ${deck.length} cards from the current deck.` : "Deck export is available in the web app. Native sharing needs a document/share module.");
  }

  function importCsv() {
    pickTextFile(".csv,text/csv", async (text) => {
      if (!db) return;
      const imported = normalizeCards(parseCsvCards(text));
      if (!imported.length) {
        setSettingsNotice("No valid CSV cards found. Use Czech, English, Hindi, Urdu, sentence, sentenceEn, tags.");
        return;
      }
      const count = await importCards(db, imported);
      setSettingsNotice(`Imported ${count} cards.`);
      await refresh(db);
    }, () => setSettingsNotice("CSV import is available in the web app. Native file picking needs a document picker module."));
  }

  function restoreJson() {
    pickTextFile(".json,application/json", async (text) => {
      if (!db) return;
      try {
        const nextSettings = await restoreBackup(db, JSON.parse(text));
        await seedCards(db, seedCardsNormalized);
        setSettingsState(nextSettings);
        setSettingsNotice("Progress backup restored.");
        await refresh(db);
      } catch {
        setSettingsNotice("Could not restore backup. Choose a JSON export from this app.");
      }
    }, () => setSettingsNotice("Restore JSON is available in the web app. Native file picking needs a document picker module."));
  }

  return {
    shuffleDueCardsInDeck,
    reviewAllNow,
    exportProgress,
    exportCurrentDeck,
    importCsv,
    restoreJson
  };
}
