declare module "@czech-flashcards/shared/seed" {
  const payload: {
    generatedFrom: string[];
    generatedAt: string;
    cards: Array<Record<string, unknown>>;
  };
  export default payload;
}

declare module "*.jpg" {
  const source: string;
  export default source;
}

declare const process: {
  env: Record<string, string | undefined>;
};
