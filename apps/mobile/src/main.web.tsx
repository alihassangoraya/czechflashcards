import { AppRegistry } from "react-native";
import App from "../App";
import "./web.css";

AppRegistry.registerComponent("CzechFlashcards", () => App);
AppRegistry.runApplication("CzechFlashcards", {
  rootTag: document.getElementById("root")
});
