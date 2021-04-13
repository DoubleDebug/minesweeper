import 'animate.css';
import { Fireworks } from 'fireworks-js';

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

    gameOver() {
        this.fireworks.start();
        const label = document.createElement('h1');
        label.innerHTML = 'You win!';
        label.className = 'animate__animated animate__bounce label youWin';
        this.container.querySelector('.table').appendChild(label);
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
}