export type GeminiTutorResult = {
  lesson: string;
  phonetics: string;
};

export type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};
