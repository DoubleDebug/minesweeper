import { BlockModel } from "./model.js";
import { BlockView } from "./view.js";

export class Block {
    constructor(parent, posX, posY)
    {
        this.model = new BlockModel(posX, posY);
        this.view = new BlockView(parent, this.model);
    }

    open(causedByPlayer)
    {
        if (this.model.opened) return;
        
        this.model.open();
        this.view.open(causedByPlayer);
    }

    draw()
    {
        this.view.draw();
    }

    placeMine()
    {
        this.model.placeMine();
    }
}