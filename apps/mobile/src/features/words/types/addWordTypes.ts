export type AddWordValues = {
  cz: string;
  en: string;
  cs: string;
  hi: string;
  ur: string;
  uk: string;
  sentence: string;
  sentenceEn: string;
  tag: string;
};

export type CorrectionValues = Omit<AddWordValues, "tag">;

export const initialAddWordValues: AddWordValues = {
  cz: "",
  en: "",
  cs: "",
  hi: "",
  ur: "",
  uk: "",
  sentence: "",
  sentenceEn: "",
  tag: "custom"
};
