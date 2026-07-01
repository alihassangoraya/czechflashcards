const names: Record<string, string> = {
  cs: "Czech",
  hi: "Hindi",
  ur: "Urdu",
  uk: "Ukrainian",
  en: "English"
};

export function tutorLanguageName(language: string) {
  return names[language] || names.en;
}
