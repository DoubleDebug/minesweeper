import { GameController } from "./game/controller.js";

// config URLs
const optionsURL = "../../res/config/options.json";
const edgeValuesURL = "../../res/config/edgeValues.json";
const difficultiesURL = "../../res/config/difficulties.json";

// display game start menu
GameController.getInstance(optionsURL, edgeValuesURL, difficultiesURL).then((controller) => {
    controller.displayStartMenu();
});