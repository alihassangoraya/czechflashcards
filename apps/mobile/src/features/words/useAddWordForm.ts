import { useState } from "react";
import type { TranslationKey } from "../../i18n/translations";
import { initialAddWordValues, type AddWordValues } from "./addWordTypes";

type Translate = (key: TranslationKey) => string;

type Input = {
  onSubmit: (values: AddWordValues) => void;
  translate: Translate;
};

export function useAddWordForm({ onSubmit, translate }: Input) {
  const [values, setValues] = useState<AddWordValues>(initialAddWordValues);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const update = (key: keyof AddWordValues, value: string) => setValues((current) => ({ ...current, [key]: value }));

  function submit() {
    if (!values.cz.trim() || !values.en.trim()) {
      setError(translate("words.validationRequired"));
      return;
    }
    setError("");
    onSubmit(values);
    setValues(initialAddWordValues);
    setShowDetails(false);
  }

  return { values, showDetails, error, update, submit, setShowDetails };
}

export type AddWordFormState = ReturnType<typeof useAddWordForm>;
