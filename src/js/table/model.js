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
        this.blocks.map(row => row.map(block => block.model.hasMine = false));
    
        let minesPlaced = 0;
        while (minesPlaced < numOfMines)
        {
            const w = Math.floor(Math.random() * this.width);
            const h = Math.floor(Math.random() * this.height);

            if (w != startingBlockPos.x && h != startingBlockPos.y && !this.blocks[h][w].model.hasMine)
            {
                this.blocks[h][w].model.placeMine();
                minesPlaced++;
            }
        }

        //print table in console
        //this.blocks.map(row => row.map(block => console.log(`${block.model.x} ${block.model.y} ${block.model.hasMine}`)));
        //this.blocks.map(row => row.map(block => console.table(block)));
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