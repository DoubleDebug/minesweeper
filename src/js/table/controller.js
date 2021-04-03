import { TableModel } from "./model.js";
import { TableView } from "./view.js";
import { Block } from "../block/controller.js";
import { Settings } from "../main.js";


export class Table {
    constructor(parent, width, height)
    {
        this.model = new TableModel(width, height);
        this.view = new TableView(parent, this.model);

        // initializing blocks
        this.initializeBlocks(width, height);
    }

    initializeBlocks(width, height)
    {
        for (let i=0; i<width; i++)
        {
            for (let j=0; j<height; j++)
                this.model.blocks[i][j] = new Block(this.view.container, i, j);
        }
    }

    draw()
    {
        this.view.draw();
    }

    async startGame(startingBlockPos)
    {
        const config = await Settings();
        this.model.placeMines(startingBlockPos, config.numOfMines);
    }
}