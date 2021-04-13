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
                this.model.blocks[i][j] = new Block(this.view.container, j, i);
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

    openBlock(posX, posY, openedByPlayer)
    {
        this.model.blocks[posY][posX].open(openedByPlayer);
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

    markBlock(posX, posY)
    {
        this.model.blocks[posY][posX].mark();
    }

    isTheGameOver(numOfMines)
    {
        return this.model.isTheGameOver(numOfMines);
    }
}