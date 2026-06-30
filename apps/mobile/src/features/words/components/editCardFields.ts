import type { TranslationKey } from "../../../i18n/translations";
import { languageDisplayNames } from "../../../i18n/languageDisplayNames";
import type { EditCardFieldKey } from "./editCardFormTypes";

export type EditCardField = {
  key: EditCardFieldKey;
  labelKey: TranslationKey;
  label?: string;
  rtl?: boolean;
};

export const editCardFields: EditCardField[] = [
  { key: "cz", labelKey: "words.czechWord" },
  { key: "en", labelKey: "language.english", label: languageDisplayNames.en },
  { key: "hi", labelKey: "language.hindi", label: languageDisplayNames.hi },
  { key: "ur", labelKey: "language.urdu", label: languageDisplayNames.ur, rtl: true },
  { key: "sentence", labelKey: "words.czechExample" },
  { key: "sentenceEn", labelKey: "words.englishExample" }
];
