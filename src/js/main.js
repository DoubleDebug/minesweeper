import { Table } from "./table/controller.js"
const config = "../../config/config.json";

export const Settings = async () => {
    return await fetch(config)
    .then(response => response.json());
}

export const GameController = async () => {

    const settings = await Settings();
    const table = new Table(document.body, settings.width, settings.height);
    const initialize = async () =>
    {
        table.draw();
    };

    const startGame = (startingBlockPos) =>
    {
        table.startGame(startingBlockPos);
    }

    return {
        initialize: initialize,
        startGame: startGame }
};

(await GameController()).initialize();