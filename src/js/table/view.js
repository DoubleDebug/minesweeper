export class TableView {
    constructor(parent, model)
    {
        this.parent = parent;
        this.container = document.createElement('div');
        this.model = model;
    }

    draw(blockSizes)
    {
        this.container.className = 'gameGrid animationFadeInDown';

        this.container.style.gridTemplateRows = `repeat(${this.model.height}, auto)`;
        this.container.style.gridTemplateColumns = `repeat(${this.model.width}, auto)`;

        this.parent.appendChild(this.container);

        // scaling the block based on the board size
        var blockSize = '';
        blockSizes.map(size => {
            if (this.model.height >= size.min && this.model.height <= size.max)
                blockSize = size.className;
        });
            
        // draw each block
        this.model.blocks.map(row => row.map(block => {
            block.draw(blockSize);
        }));
    }
}