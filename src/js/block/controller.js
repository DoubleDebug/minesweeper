import { BlockModel } from "./model.js";
import { BlockView } from "./view.js";

export class Block {
    constructor(parent, posX, posY) {
        this.model = new BlockModel(posX, posY);
        this.view = new BlockView(parent, this.model);
    }

    open() {
        if (this.model.opened) return;
        
        this.model.open();
        this.view.open();
    }

    draw() {
        this.view.draw();
    }

    placeMine() {
        this.model.placeMine();
    }

    mark() {
        this.view.mark();
        this.model.mark();
    }
}