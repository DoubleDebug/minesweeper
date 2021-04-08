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
        for (let i=0; i<height; i++)
        {
            for (let j=0; j<width; j++)
                this.model.blocks[i][j] = new Block(this.view.container, i, j);
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

    openBlock(posX, posY)
    {
        this.model.blocks[posX][posY].open();
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
                if (!this.model.outOfBounds(posX + a, posY + b) && !this.model.blocks[posX + a][posY + b].model.opened)
                    this.model.blocks[posX + a][posY + b].open();
            }
        }
    }

    markBlock(posX, posY)
    {
        this.model.blocks[posX][posY].mark();
    }

    isTheGameOver(numOfMines)
    {
        return this.model.isTheGameOver(numOfMines);
    }
}