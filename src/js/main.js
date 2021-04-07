import { Table } from "./table/controller.js"
const configURL = "../../config/config.json";

// singleton game controller
export const GameController = (async () => {
    let instance;
    let gameStarted = false;
    let table;
    const gameConfig = await settings();

    function createInstance()
    {
        return {
            initializeGame: initializeGame,
            startGame: startGame,
            settings: gameConfig,
            gameOver: gameOver,
            countSurroundingMines: countSurroundingMines,
            gameStarted: gameStarted
        };
    }

    function initializeGame()
    {
        table = new Table(document.body, this.settings.width, this.settings.height);
        table.draw();
    }

    function startGame(startingBlockPos)
    {
        table.startGame(startingBlockPos, this.settings.numOfMines);
        this.gameStarted = true;
    }

    async function settings()
    {
        return await fetch(configURL)
        .then(response => response.json());
    }

    function gameOver()
    {
        table.openAll();
        alert('You stepped on a mine. Game over!');
    }

    function countSurroundingMines(posX, posY)
    {
        return table.countSurroundingMines(posX, posY);
    }

    return {
        getInstance: () => {
            if (!instance)
                instance = createInstance();
            return instance;
        }
    };
})();

(await GameController).getInstance().initializeGame();