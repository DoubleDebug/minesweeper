import { GameController } from "./game/controller.js";
const optionsURL = "../../config/options.json";
GameController.getInstance(optionsURL).then((controller) => {
    controller.displayStartMenu();
});