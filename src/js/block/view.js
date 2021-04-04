import { StartGame } from "../main.js";

export class BlockView {
    constructor(parent, model)
    {
        this.parent = parent;
        this.container = null;
        this.model = model;
    }

    draw()
    {
        this.container = document.createElement('div');
        this.container.className = 'block';
        this.container.onclick = () => { this.open(); };
        this.parent.appendChild(this.container);
    }
    
    open()
    {
        if (this.model.hasMine == undefined)
        {
            StartGame({
                "x": this.model.x,
                "y": this.model.y
            });
        }

        if (this.model.hasMine)
            this.container.innerHTML = '💣';
    }
}