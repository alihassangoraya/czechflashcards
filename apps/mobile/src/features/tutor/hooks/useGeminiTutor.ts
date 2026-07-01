import { useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import { explainCzechCard, type GeminiTutorResult } from "../../../services/gemini/tutorService";

export function useGeminiTutor(card: Card | null, language: string) {
  const [openForId, setOpenForId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiTutorResult | null>(null);

  async function openTutor() {
    if (!card || loading) return;
    setOpenForId(card.id);
    setResult(null);
    setLoading(true);
    try {
      setResult(await explainCzechCard(card, language));
    } finally {
      setLoading(false);
    }
  }

  return {
    closeTutor: () => setOpenForId(null),
    isOpen: !!card && openForId === card.id,
    loading,
    openTutor,
    result
  };
}
