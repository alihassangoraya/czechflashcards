import { AppRegistry } from "react-native";
import App from "../App";
import { cleanupLegacyWebCache } from "./app/web/legacyCacheCleanup.web";
import { startupThemeMode } from "./theme/design";
import { applyWebThemeVariables } from "./theme/webThemeVariables";
import "./web.css";

cleanupLegacyWebCache();
applyWebThemeVariables(startupThemeMode);

AppRegistry.registerComponent("CzechFlashcards", () => App);
AppRegistry.runApplication("CzechFlashcards", {
  rootTag: document.getElementById("root")
});
