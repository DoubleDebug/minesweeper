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
        this.container.className = 'block';
        this.container.onclick = () => { this.open(true); };
        this.parent.appendChild(this.container);
    }
    
    open(causedByPlayer)
    {
        GameController.then((gc) => {
            const controller = gc.getInstance();

            // checking if the game has started
            if (!controller.gameStarted)
            {
                console.log('game started');
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
                if (causedByPlayer === true)
                {
                    controller.gameOver();
                }
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
        });        
    }
}