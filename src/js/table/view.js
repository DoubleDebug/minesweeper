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
        var blockSize = '', heightClass, widthClass;
        const priorityList = {
            small: 3,
            normal: 2,
            large: 1
        };
        blockSizes.map(size => {
            if (this.model.height >= size.height.min
                && this.model.height <= size.height.max)
                {
                    heightClass = size.className;
                }

            if (this.model.width >= size.width.min
                && this.model.width <= size.width.max)
                {
                    widthClass = size.className;
                }                
        });

        if (priorityList[heightClass] > priorityList[widthClass])
            blockSize = heightClass;
        else
            blockSize = widthClass;
        
        // draw each block
        this.model.blocks.map(row => row.map(block => {
            block.draw(blockSize);
        }));
    }
}