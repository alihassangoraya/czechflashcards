type SpeechOptions = {
  language?: string;
  rate?: number;
};

export function speak(text: string, options: SpeechOptions = {}) {
  if (!text) return;
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.language || "cs-CZ";
    utterance.rate = options.rate || 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

export function stop() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
