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
            this.startStopwatch();
        }, 1000);
    }
}