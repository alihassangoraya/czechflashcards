import { Platform, Share } from "react-native";

export async function downloadJson(fileName: string, payload: unknown): Promise<boolean> {
  if (Platform.OS !== "web" || typeof document === "undefined") return shareJson(fileName, payload);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  return true;
}

async function shareJson(fileName: string, payload: unknown): Promise<boolean> {
  try {
    const result = await Share.share({ title: fileName, message: JSON.stringify(payload, null, 2) });
    return result.action !== Share.dismissedAction;
  } catch {
    return false;
  }
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
