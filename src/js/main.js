import { Table } from "./table/controller.js";
import { Fireworks } from "fireworks-js";
import 'animate.css';
const configURL = "../../config/options.json";

// TO DO: separate the game controller into MVC componenets

// singleton game controller
export const GameController = (async () => {
    let instance;
    let table;
    let gameState = 'none';
    let fireworks;
    const gameConfig = await settings();

    function createInstance()
    {
        return {
            settings: gameConfig,
            gameState: gameState,
            initializeGame: function initializeGame()
            {
                prepareFireworks();
                table = new Table(document.querySelector('.gameContainer'), this.settings.width, this.settings.height);
                table.draw();
            },
            startGame: function startGame(startingBlockPos)
            {
                table.startGame(startingBlockPos, this.settings.numOfMines);
                this.gameState = 'started';
            },
            openBlock: function openBlock(posX, posY)
            {
                table.openBlock(posX, posY);
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
                return table.isTheGameOver(gameConfig.numOfMines);
            },
            gameOver: function gameOver() {
                this.gameState = 'over';

                fireworks.start();
                const label = document.createElement('h1');
                label.innerHTML = 'You win!';
                label.className = 'animate__animated animate__bounce label youWin';
                document.querySelector('.table').appendChild(label);
            }
        };
    }

    async function settings()
    {
        return await fetch(configURL)
        .then(response => response.json());
    }

    function prepareFireworks()
    {
        const cont = document.querySelector('.gameContainer');
        fireworks = new Fireworks({
            target: cont,
            hue: 120,
            startDelay: 1,
            minDelay: 20,
            maxDelay: 30,
            speed: 5,
            acceleration: 1.15,
            friction: 0.88,
            gravity: 1,
            particles: 65,
            trace: 3,
            explosion: 6,
            boundaries: {
              top: 70,
              bottom: cont.clientHeight,
              left: 70,
              right: cont.clientWidth
            },
            sound: {
              enable: false }
        });
    }

    return {
        getInstance: () => {
            if (!instance)
                instance = createInstance();
            return instance;
        }
    };
})();

GameController.then((gc) => gc.getInstance().initializeGame());