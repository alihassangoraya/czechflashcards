import type { TranslationKey } from "../../../i18n/translations";
import type { EditCardFieldKey } from "./editCardFormTypes";

export type EditCardField = {
  key: EditCardFieldKey;
  labelKey: TranslationKey;
  rtl?: boolean;
};

export const editCardFields: EditCardField[] = [
  { key: "cz", labelKey: "words.czechWord" },
  { key: "en", labelKey: "language.english" },
  { key: "hi", labelKey: "language.hindi" },
  { key: "ur", labelKey: "language.urdu", rtl: true },
  { key: "sentence", labelKey: "words.czechExample" },
  { key: "sentenceEn", labelKey: "words.englishExample" }
];
