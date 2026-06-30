export function inspectReadmeArchitecture(content) {
  return [
    ...missingText(content),
    ...forbiddenText(content)
  ];
}

import { readmeForbiddenText, readmeRequiredText } from "./readmeArchitectureRules.mjs";

function missingText(content) {
  return readmeRequiredText
    .filter((text) => !content.includes(text))
    .map((text) => `README.md missing ${JSON.stringify(text)}`);
}

function forbiddenText(content) {
  return readmeForbiddenText
    .filter((text) => content.includes(text))
    .map((text) => `README.md contains stale text ${JSON.stringify(text)}`);
}
