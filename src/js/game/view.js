import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import { Fireworks } from 'fireworks-js';
import { GameController } from "./controller.js";

export class GameView {
    constructor(parent) {
        this.parent = parent;
        this.container = document.createElement('div');
        this.container.className = 'gameContainer';
        parent.appendChild(this.container);
    }

    startGame() {
        // TODO:
        // add stopwatch & mines left
    }

    gameOver(result) {
        const label = document.createElement('h1');
        if (result === 'success')
        {
            this.fireworks.start();
            label.innerHTML = 'You win!';
            label.className = 'animate__animated animate__shakeY label youWin';
        }
        else if (result === 'failure')
        {
            label.innerHTML = 'You lose!';
            label.className = 'animate__animated animate__shakeX label youWin';
        }
        this.container.querySelector('.gameGrid').appendChild(label);
    }

    prepareFireworks()
    {
        this.fireworks = new Fireworks({
            target: this.container,
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
              bottom: this.container.clientHeight,
              left: 70,
              right: this.container.clientWidth
            },
            sound: {
              enable: false }
        });
    }

    drawStartMenu()
    {
        const startMenu = document.createElement('div');
        startMenu.className = 'startMenuContainer animate__animated animate__fadeInDown';

        const gameTitle = document.createElement('h1');
        gameTitle.innerHTML = 'minesweeper';
        gameTitle.className = 'label gameTitle'
        startMenu.appendChild(gameTitle);

        const btnStartGame = document.createElement('button');
        btnStartGame.className = 'btn btn-light btnPlay';
        btnStartGame.innerHTML = 'Play';
        btnStartGame.onclick = () => { GameController.getInstance().then((gc) => {
            
            // remove start menu
            this.container.removeChild(startMenu);

            // start game            
            gc.initializeGame();

        })}
        startMenu.appendChild(btnStartGame);

        this.container.appendChild(startMenu);
    }
}