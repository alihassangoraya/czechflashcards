import type { AddWordValues } from "../appTypes";

export function isValidCustomWord(values: AddWordValues) {
  return Boolean(values.cz.trim() && values.en.trim());
}
