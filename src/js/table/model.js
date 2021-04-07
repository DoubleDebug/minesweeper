export class TableModel {
    constructor (width, height)
    {
        this.width = width;
        this.height = height;
        this.blocks = new Array(height);
        for (let i=0; i<height; i++)
            this.blocks[i] = new Array(width);
    }

    placeMines(startingBlockPos, numOfMines)
    {
        // removing mines from board
        this.blocks.map(row => row.map(block => block.model.hasMine = false));    
        
        // finding blocks that shouldn't have mines
        // (starting block + his surrounding blocks)
        const forbiddenBlocks = [];
        for (let a = -1; a < 2; a++)
        {
            for (let b = -1; b < 2; b++)
            {
                if (this.outOfBounds(startingBlockPos.y + b, startingBlockPos.x + a))
                    continue;

                forbiddenBlocks.push([startingBlockPos.x + a, startingBlockPos.y + b]);
            }
        }

        let minesPlaced = 0;
        while (minesPlaced < numOfMines)
        {
            // calculating random position to place mine
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);

            // checking if the chosen block already has a mine
            if (this.blocks[y][x].model.hasMine)
                continue;

            // checking if the chosen block is forbidden
            let contains = false;
            for (let i=0; i<forbiddenBlocks.length; i++)
            {
                if (forbiddenBlocks[i][0] == x && forbiddenBlocks[i][1] == y)
                {
                    contains = true;
                    break;
                }
            }
            if (contains) continue;

            // placing the mine
            this.blocks[y][x].model.placeMine();
            minesPlaced++;
        }

        //print table in console
        //this.blocks.map(row => row.map(block => console.log(`${block.model.x} ${block.model.y} ${block.model.hasMine}`)));
    }

    countSurroundingMines(posX, posY)
    {
        if (this.outOfBounds(posX, posY))
            return;

        let mines = 0;
        for (let a = -1; a < 2; a++)
        {
            for (let b = -1; b < 2; b++)
            {
                if (this.outOfBounds(posY + b, posX + a))
                    continue;

                if (this.blocks[posY + b][posX + a].model.hasMine)
                    mines++;
            }
        }

        return mines;
    }

    outOfBounds(posX, posY)
    {
        if (posX < 0 || posX >= this.width || posY < 0 || posY >= this.height)
            return true;

        return false;
    }    
}