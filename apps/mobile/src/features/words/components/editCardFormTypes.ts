import type { Card } from "@czech-flashcards/shared";

export type EditCardFormValues = {
  cz: string;
  en: string;
  cs: string;
  hi: string;
  ur: string;
  uk: string;
  sentence: string;
  sentenceEn: string;
};

export type EditCardFieldKey = keyof EditCardFormValues;

export type EditCardFormProps = {
  card: Card;
  onSubmit: (values: EditCardFormValues) => void;
};
