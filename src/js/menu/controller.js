import { MenuModel } from './model.js';
import { MenuView } from './view.js';

export class Menu {
    constructor(parent) {
        this.model = new MenuModel();
        this.view = new MenuView(parent, this.model);
    }

    draw() {
        this.view.draw();
    }

    startStopwatch()
    {
        setTimeout(() => {
            this.model.increaseTime();
            this.view.increaseTime();
            if (!this.model.gameOver)
                this.startStopwatch();
        }, 1000);
    }

    stopStopwatch()
    {
        // the game is over
        this.model.gameOver = true;

        // show settings
        if (!document.getElementsByClassName('settingsContainer')[0].classList.contains('show'))
            document.getElementById('iconSettings').contentDocument.querySelector('svg').onmouseup();
    }
}