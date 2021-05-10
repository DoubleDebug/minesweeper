import { drawSettings } from "../menu/view.js";
import { Menu } from "../menu/controller.js";
import { Table } from "../table/controller.js";
import { GameModel } from "./model.js";
import { GameView } from "./view.js";

// singleton game controller
export const GameController = (() => {
    let instance, table, menu;

    async function createInstance(optionsURL, edgeValuesURL, difficultiesURL)
    {
        // fetch config from URL parameters
        let config = {};
        await fetchOptions(config, optionsURL, edgeValuesURL, difficultiesURL);

        // initialize game model and view
        let model = new GameModel();
        let view = new GameView(document.body);

        // return game controller instance
        return {
            config: config,
            gameState: () => { return model.state },
            displayStartMenu: function displayStartMenu()
            {
                view.drawFrontPage();
            },
            initializeGame: function initializeGame()
            {
                table = new Table(view.container, config.options.width, config.options.height);
                table.draw(config.edgeValues.blockSizes);

                menu = new Menu(view.container, config);
                menu.startStopwatch();

                view.prepareFireworks();
            },
            startGame: function startGame(startingBlockPos)
            {
                table.startGame(startingBlockPos, config.options.numOfMines);
                model.startGame();
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
            markBlock: function markBlock(posX, posY, alreadyMarked)
            {
                table.markBlock(posX, posY);

                // update 'mines left' label
                const label = document.getElementById('labelMinesLeft');
                label.minesLeft = (alreadyMarked) ? (label.minesLeft + 1) : (label.minesLeft - 1);
                label.innerHTML = `| ${(label.minesLeft >= 0) ? label.minesLeft : 0} mines left`;
            },
            isTheGameOver: function isTheGameOver()
            {
                return table.isTheGameOver(config.options.numOfMines);
            },
            gameOver: function gameOver(result) {
                model.gameOver();
                view.gameOver(result);
                table.openAll();
                menu.stopStopwatch();
                menu.showMenu();
                
                // update 'mines left' label
                document.getElementById('labelMinesLeft').innerHTML = `| 0 mines left`;
            },
            restartGame: function restartGame(currentOptions, callback) {
                // apply selected options
                config.options = currentOptions;

                // remove view elements for current game
                table.view.container.remove();
                menu.view.container.remove();
                view.stopFireworks();

                // initialize new game
                model = new GameModel();
                callback();
            },
            displaySettings: function displaySettings(container)
            {
                drawSettings(config, container);
            }
        };
    }

    async function fetchOptions(config, optionsURL, edgeValuesURL, difficultiesURL)
    {
        await Promise.all([
            fetch(optionsURL).then(response => response.json()),
            fetch(edgeValuesURL).then(response => response.json()),
            fetch(difficultiesURL).then(response => response.json())
        ]).then((configObjects) => {
            configObjects.map(object => config[object.name] = object);
        });
    }

    return {
        getInstance: async (optionsURL, edgeValuesURL, difficultiesURL) => {
            if (!instance)
                instance = await createInstance(optionsURL, edgeValuesURL, difficultiesURL);
            return instance;
        }
    };
})();