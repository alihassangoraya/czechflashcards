import type { StudySettings } from "../../database";
import { slug } from "./settingsFormat";

type SettingsPatch = Partial<StudySettings>;

export function buildCreateDeckPatch(settings: StudySettings, rawName: string, now = Date.now()): SettingsPatch | null {
  const name = normalizeDeckName(rawName);
  if (!name || hasDeckName(settings, name)) return null;

  const deck = { id: `deck-${slug(name)}-${now}`, name };
  return { customDecks: [...settings.customDecks, deck], deckFilter: deck.id };
}

export function buildRenameDeckPatch(settings: StudySettings, deckId: string, rawName: string): SettingsPatch | null {
  const name = normalizeDeckName(rawName);
  if (!name || hasDeckName(settings, name, deckId)) return null;
  return { customDecks: settings.customDecks.map((deck) => deck.id === deckId ? { ...deck, name } : deck) };
}

export function buildDeleteDeckPatch(settings: StudySettings, deckId: string): SettingsPatch {
  return {
    customDecks: settings.customDecks.filter((deck) => deck.id !== deckId),
    deckFilter: settings.deckFilter === deckId ? `${settings.examLevel}-focus` : settings.deckFilter
  };
}

export function normalizeDeckName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function hasDeckName(settings: StudySettings, name: string, exceptDeckId?: string) {
  return settings.customDecks.some((deck) => deck.id !== exceptDeckId && deck.name.toLowerCase() === name.toLowerCase());
}
