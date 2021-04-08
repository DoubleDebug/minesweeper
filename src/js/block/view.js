import { GameController } from "../main.js";

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
        Object.assign(this.container, {
            className: 'block',
            onclick: () => {
                GameController.then((gc) => gc.getInstance().openBlock(this.model.x, this.model.y))
            },
            oncontextmenu: (ev) => {
                ev.preventDefault();
                GameController.then((gc) => gc.getInstance().markBlock(this.model.x, this.model.y));
        }});
        this.parent.appendChild(this.container);
    }
    
    open()
    {
        GameController.then((gc) => {
            const controller = gc.getInstance();

            // checking if the game has started
            if (controller.gameState == 'none')
            {
                controller.startGame({
                    "x": this.model.x,
                    "y": this.model.y
                });
            }

            // checking if the block has a mine
            if (this.model.hasMine)
            {
                this.container.innerHTML = '💣';
                this.container.classList.add('openedRed');      // change block color
                
                // game over
                controller.openAllBlocks();
            }
            else
            {
                this.container.classList.add('openedGreen');    // change block color
                const numOfMines = controller.countSurroundingMines(this.model.x, this.model.y);

                if (numOfMines != 0)
                {
                    this.container.innerHTML = numOfMines;
                }
            }

            // checking if the game is over
            if (controller.isTheGameOver() && controller.gameState != 'over')
                controller.gameOver();
        });        
    }

    mark()
    {
        if (this.model.opened) return;

        if (this.model.marked)
            this.container.innerHTML = '';
        else
            this.container.innerHTML = '🚩';
    }
}