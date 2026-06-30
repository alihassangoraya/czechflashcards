import type { AddWordValues } from "../appShellTypes";

export function isValidCustomWord(values: AddWordValues) {
  return Boolean(values.cz.trim() && values.en.trim());
}
