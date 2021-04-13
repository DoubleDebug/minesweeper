import { Table } from "../table/controller.js";
import { GameModel } from "./model.js";
import { GameView } from "./view.js";

// singleton game controller
export const GameController = (() => {
    let instance, table;

    async function createInstance(optionsURL)
    {
        let options = await getOptions(optionsURL);
        let model = new GameModel();
        let view = new GameView(document.body);
        return {
            settings: options,
            gameState: () => { return model.state },
            initializeGame: function initializeGame()
            {
                table = new Table(view.container, options.width, options.height);
                table.draw();
                view.prepareFireworks();
            },
            startGame: function startGame(startingBlockPos)
            {
                table.startGame(startingBlockPos, options.numOfMines);
                model.startGame();
                view.startGame();
            },
            openBlock: function openBlock(posX, posY, openedByPlayer)
            {
                table.openBlock(posX, posY, openedByPlayer);
            },
            openAllBlocks: function openAllBlocks()
            {
                table.openAll();
            },
            countSurroundingMines: function countSurroundingMines(posX, posY)
            {
                return table.countSurroundingMines(posX, posY);
            },
            markBlock: function markBlock(posX, posY)
            {
                table.markBlock(posX, posY);
            },
            isTheGameOver: function isTheGameOver()
            {
                return table.isTheGameOver(options.numOfMines);
            },
            gameOver: function gameOver() {
                model.gameOver();
                view.gameOver();
                table.openAll();
            }
        };
    }

    async function getOptions(optionsURL)
    {
        return await fetch(optionsURL)
        .then(response => response.json());
    }

    return {
        getInstance: async (optionsURL) => {
            if (!instance)
                instance = await createInstance(optionsURL);
            return instance;
        }
    };
})();