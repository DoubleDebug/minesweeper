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
        this.container.onclick = () => { this.model.placeMines() }

        this.container.style.gridTemplateRows = `repeat(${this.model.width}, auto)`;
        this.container.style.gridTemplateColumns = `repeat(${this.model.height}, auto)`;

        this.parent.appendChild(this.container);
        this.model.blocks.map(row => row.map(block => {
            block.draw();
        }));
    }
}