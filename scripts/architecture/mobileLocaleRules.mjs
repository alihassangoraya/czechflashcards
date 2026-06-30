import { localeLanguages, localeSections } from "./mobileArchitectureConfig/index.mjs";

export function inspectLocaleSections(relativeFiles, violations) {
  const fileSet = new Set(relativeFiles);
  for (const language of localeLanguages) {
    for (const section of localeSections) {
      const sectionPath = `i18n/locales/${language}/${section}.ts`;
      if (!fileSet.has(sectionPath)) violations.localeSections.push(`${sectionPath}: missing locale section`);
    }
  }
}
