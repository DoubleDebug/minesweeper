import { BlockModel } from "./model.js";
import { BlockView } from "./view.js";

export class Block {
    constructor(parent, hasMine)
    {
        this.model = new BlockModel(hasMine);
        this.view = new BlockView(parent, this.model);
    }

    open()
    {
        this.model.open();
        this.view.open();
    }

    draw()
    {
        this.view.draw();
    }
}