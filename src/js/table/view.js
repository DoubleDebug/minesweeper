export class TableView {
    constructor(parent, model)
    {
        this.parent = parent;
        this.container = document.createElement('div');
        this.model = model;
    }

    draw()
    {
        this.container.className = 'table';

        this.container.style.gridTemplateRows = `repeat(${this.model.height}, auto)`;
        this.container.style.gridTemplateColumns = `repeat(${this.model.width}, auto)`;

        this.parent.appendChild(this.container);

        // draw each block
        this.model.blocks.map(row => row.map(block => {
            block.draw();
        }));
    }
}