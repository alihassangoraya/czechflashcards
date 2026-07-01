import { AppRegistry } from "react-native";
import App from "../App";
import { startupThemeMode } from "./theme/design";
import { applyWebThemeVariables } from "./theme/webThemeVariables";
import "./web.css";

applyWebThemeVariables(startupThemeMode);

AppRegistry.registerComponent("CzechFlashcards", () => App);
AppRegistry.runApplication("CzechFlashcards", {
  rootTag: document.getElementById("root")
});
