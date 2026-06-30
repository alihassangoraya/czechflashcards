import type { Card } from "@czech-flashcards/shared";

export type EditCardFormValues = {
  cz: string;
  en: string;
  hi: string;
  ur: string;
  sentence: string;
  sentenceEn: string;
};

export type EditCardFieldKey = keyof EditCardFormValues;

export type EditCardFormProps = {
  card: Card;
  onSubmit: (values: EditCardFormValues) => void;
};
