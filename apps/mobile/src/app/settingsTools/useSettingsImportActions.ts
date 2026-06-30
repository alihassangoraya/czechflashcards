import { normalizeCards, parseCsvCards } from "@czech-flashcards/shared";
import { addCardToCustomDeck, importCards, restoreBackup, seedCards } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import { pickTextFile } from "../../services/fileTransfer";
import { seedCardsNormalized, seedVersion } from "../appSeed";
import type { SettingsImportContext } from "./settingsToolTypes";

export function useSettingsImportActions({ db, settings, setSettingsState, setSettingsNotice, refresh }: SettingsImportContext) {
  const { t } = useI18n();

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

  return { importCsv, restoreJson };
}
