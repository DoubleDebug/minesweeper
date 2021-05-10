import { GameController } from "./game/controller.js";

// config URLs
const optionsURL = "../../config/options.json";
const edgeValuesURL = "../../config/edgeValues.json";
const difficultiesURL = "../../config/difficulties.json";

// display game start menu
GameController.getInstance(optionsURL, edgeValuesURL, difficultiesURL).then((controller) => {
    controller.displayStartMenu();
});