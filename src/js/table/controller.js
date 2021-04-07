import { TableModel } from "./model.js";
import { TableView } from "./view.js";
import { Block } from "../block/controller.js";


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
                this.model.blocks[j][i] = new Block(this.view.container, i, j);
        }
    }

    draw()
    {
        this.view.draw();
    }

    startGame(startingBlockPos, numOfMines)
    {
        this.model.placeMines(startingBlockPos, numOfMines);
    }

    openAll()
    {
        this.model.blocks.map(row => row.map(block => block.open()));
    }

    countSurroundingMines(posX, posY)
    {
        const numOfMines = this.model.countSurroundingMines(posX, posY);
        if (numOfMines == 0)
        {
            this.openSurroundingMines(posX, posY);
        }
        return numOfMines;
    }

    openSurroundingMines(posX, posY)
    {
        for (let a = -1; a < 2; a++)
        {
            for (let b = -1; b < 2; b++)
            {
                if (!this.model.outOfBounds(posX + a, posY + b) && !this.model.blocks[posY + b][posX + a].model.opened)
                    this.model.blocks[posY + b][posX + a].open();
            }
        }
    }
}