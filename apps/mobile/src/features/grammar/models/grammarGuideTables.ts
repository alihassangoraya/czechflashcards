import { specialConjugations } from "./grammarConjugationSpecials";

export const declensionRows = [
  { caseKey: "grammar.caseNomShort", masculine: "- / -ec", feminine: "-a", neuter: "-o / -e" },
  { caseKey: "grammar.caseGenShort", masculine: "-a / -u", feminine: "-y / -e", neuter: "-a / -ete" },
  { caseKey: "grammar.caseAccShort", masculine: "-a / -", feminine: "-u / -i", neuter: "-o / -e" },
  { caseKey: "grammar.caseLocShort", masculine: "-ovi / -u", feminine: "-ě / -i", neuter: "-u / -eti" },
  { caseKey: "grammar.caseInsShort", masculine: "-em", feminine: "-ou", neuter: "-em" }
] as const;

export function generatePresentConjugation(verb: string): string[] {
  const reflexive = verb.includes(" si") ? "si" : verb.includes(" se") ? "se" : "";
  const clean = verb.toLocaleLowerCase("cs-CZ").replace(/\s+(se|si)\b/g, "").trim();
  const forms = specialConjugations[clean] ?? regularConjugation(clean);
  if (!reflexive) return forms;
  return forms.map((form) => `${form} ${reflexive}`);
}

function regularConjugation(clean: string): string[] {
  if (clean.endsWith("ovat")) {
    const stem = clean.slice(0, -4);
    return [`já ${stem}uju`, `ty ${stem}uješ`, `on/ona ${stem}uje`, `my ${stem}ujeme`, `vy ${stem}ujete`, `oni ${stem}ují`];
  }
  if (clean.endsWith("at")) {
    const stem = clean.slice(0, -2);
    return [`já ${stem}ám`, `ty ${stem}áš`, `on/ona ${stem}á`, `my ${stem}áme`, `vy ${stem}áte`, `oni ${stem}ají`];
  }
  if (clean.endsWith("et") || clean.endsWith("ět") || clean.endsWith("it")) {
    const stem = clean.slice(0, -2);
    return [`já ${stem}ím`, `ty ${stem}íš`, `on/ona ${stem}í`, `my ${stem}íme`, `vy ${stem}íte`, `oni ${stem}í`];
  }
  return [`já ${clean}m`, `ty ${clean}š`, `on/ona ${clean}`, `my ${clean}me`, `vy ${clean}te`, `oni ${clean}jí`];
}
