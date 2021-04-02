export class BlockView {
    constructor(parent, block)
    {
        this.parent = parent;
        this.container = null;
        this.block = block;
    }

    draw()
    {
        this.container = document.createElement('div');
        this.container.className = 'block';
        this.container.onclick = open;
        this.parent.appendChild(this.container);
    }

    open()
    {
        if (block.hasMine)
            this.container.innerHTML = '💣';
    }
}