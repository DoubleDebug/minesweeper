export class TableModel {
    constructor (width, height)
    {
        this.width = width;
        this.height = height;
        this.blocks = new Array(height);
        for (let i=0; i<width; i++)
            this.blocks[i] = new Array(width);
    }

    placeMines(startingBlockPos, numOfMines)
    {
        this.blocks.map(row => row.map(block => block.model.hasMine = false ));
    
        let minesPlaced = 0;
        while (minesPlaced < numOfMines)
        {
            const w = Math.floor(Math.random() * this.width);
            const h = Math.floor(Math.random() * this.height);

            if (w != startingBlockPos.x && h != startingBlockPos.y && !this.blocks[w][h].model.hasMine)
            {
                this.blocks[w][h].model.placeMine();
                minesPlaced++;
            }
        }

        this.blocks.map(r => r.map(b => console.log(`${b.model.x} ${b.model.y} ${b.model.hasMine}`)));
    }
}