import { exportBackup } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import { downloadJson } from "../../services/fileTransfer";
import type { SettingsToolContext } from "./settingsToolTypes";

export function useSettingsExportActions({ db, deck, settings, setSettingsNotice }: SettingsToolContext) {
  const { t } = useI18n();

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

  return { exportProgress, exportCurrentDeck };
}
