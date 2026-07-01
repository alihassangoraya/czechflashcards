import { Platform } from "react-native";

export function canUseBrowserBack(hasHistory: boolean): boolean {
  return Platform.OS === "web" && typeof window !== "undefined" && hasHistory;
}
