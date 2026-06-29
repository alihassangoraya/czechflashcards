import { Platform } from "react-native";

export function downloadJson(fileName: string, payload: unknown): boolean {
  if (Platform.OS !== "web" || typeof document === "undefined") return false;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  return true;
}

export function pickTextFile(accept: string, onText: (text: string) => void | Promise<void>, onUnavailable: () => void) {
  if (Platform.OS !== "web" || typeof document === "undefined") {
    onUnavailable();
    return;
  }
  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;
  input.onchange = async () => {
    const file = input.files?.[0];
    if (file) await onText(await file.text());
    input.value = "";
  };
  input.click();
}
