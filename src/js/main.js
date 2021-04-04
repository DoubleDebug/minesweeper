import { Table } from "./table/controller.js"
const config = "../../config/config.json";

export const Settings = async () => {
    return await fetch(config)
    .then(response => response.json());
}

// implement game controller (singleton class)

export const StartGame = (startingBlockPos) => {
    table.startGame(startingBlockPos);
}

const settings = await Settings();
const table = new Table(document.body, settings.width, settings.height);
table.draw();