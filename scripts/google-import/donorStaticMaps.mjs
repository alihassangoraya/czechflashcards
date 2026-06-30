import { donorSection } from "./donorSections.mjs";

export function staticMap(block) {
  return new Map([...block.matchAll(/"([^"]+)"\s+to\s+"([^"]+)"/g)].map(([, key, value]) => [key, value]));
}

export function staticExamples(source) {
  return new Map([...donorSection(source, "generateSimpleExample", "getDailyRoutinesSocialWords").matchAll(/"([^"]+)"\s*->\s*Pair\("([^"]*)",\s*"([^"]*)"\)/g)].map(([, key, sentence, sentenceEn]) => [key, { sentence, sentenceEn }]));
}

export function donorStaticDetails(source) {
  return {
    antonyms: staticMap(donorSection(source, "generateAntonyms")),
    examples: staticExamples(source),
    synonyms: staticMap(donorSection(source, "generateSynonyms", "generateSimplePronunciation"))
  };
}
