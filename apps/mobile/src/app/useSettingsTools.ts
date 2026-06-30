import { normalizeCards, parseCsvCards, type Card } from "@czech-flashcards/shared";
import {
  addCardToCustomDeck,
  exportBackup,
  importCards,
  markCardsDueNow,
  restoreBackup,
  seedCards,
  type AppDatabase,
  type StudySettings
} from "../database";
import { downloadJson, pickTextFile } from "../services/fileTransfer";
import { useI18n } from "../i18n/I18nProvider";
import { seedCardsNormalized, seedVersion } from "./appSeed";

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
  const { t } = useI18n();

  function shuffleDueCardsInDeck() {
    shuffleDueCards(setSettingsNotice);
    forceDeckRefresh();
  }

  async function reviewAllNow() {
    if (!db) return;
    const count = await markCardsDueNow(db, deck.map((card) => card.id));
    clearShuffledDueQueue();
    setSettingsNotice(count ? t("settings.notice.reviewDue", { count }) : t("settings.notice.noCards"));
    await refresh(db);
  }

  async function exportProgress() {
    if (!db) return;
    const ok = downloadJson("czech-flashcards-progress.json", exportBackup(db));
    setSettingsNotice(ok ? t("settings.notice.progressExported") : t("settings.notice.exportWebOnly"));
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
    setSettingsNotice(ok ? t("settings.notice.deckExported", { count: deck.length }) : t("settings.notice.deckExportWebOnly"));
  }

  function importCsv() {
    pickTextFile(".csv,text/csv", async (text) => {
      if (!db) return;
      const imported = normalizeCards(parseCsvCards(text));
      if (!imported.length) {
        setSettingsNotice(t("settings.notice.csvInvalid"));
        return;
      }
      const count = await importCards(db, imported);
      const activeCustomDeck = settings?.customDecks.find((deck) => deck.id === settings.deckFilter);
      if (activeCustomDeck) {
        for (const card of imported) await addCardToCustomDeck(db, activeCustomDeck.id, card.id);
      }
      setSettingsNotice(activeCustomDeck ? t("settings.notice.csvImportedDeck", { count, deck: activeCustomDeck.name }) : t("settings.notice.csvImported", { count }));
      await refresh(db);
    }, () => setSettingsNotice(t("settings.notice.csvWebOnly")));
  }

  function restoreJson() {
    pickTextFile(".json,application/json", async (text) => {
      if (!db) return;
      try {
        const nextSettings = await restoreBackup(db, JSON.parse(text));
        await seedCards(db, seedCardsNormalized, seedVersion);
        setSettingsState(nextSettings);
        setSettingsNotice(t("settings.notice.restoreSuccess"));
        await refresh(db);
      } catch {
        setSettingsNotice(t("settings.notice.restoreFailed"));
      }
    }, () => setSettingsNotice(t("settings.notice.restoreWebOnly")));
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
