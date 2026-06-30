export type AddWordValues = {
  cz: string;
  en: string;
  hi: string;
  ur: string;
  sentence: string;
  sentenceEn: string;
  tag: string;
};

export type CorrectionValues = Omit<AddWordValues, "tag">;

export const initialAddWordValues: AddWordValues = {
  cz: "",
  en: "",
  hi: "",
  ur: "",
  sentence: "",
  sentenceEn: "",
  tag: "custom"
};
