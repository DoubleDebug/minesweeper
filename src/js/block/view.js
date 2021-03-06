import { GameController } from "../game/controller.js";

export class BlockView {
    constructor(parent, model)
    {
        this.parent = parent;
        this.container = null;
        this.model = model;
    }

    draw(blockSize)
    {
        this.container = document.createElement('div');

        // assigning block left and right click events
        Object.assign(this.container, {
            className: 'block ' + blockSize,
            onclick: () => {
                GameController.getInstance().then((c) => c.openBlock(this.model.x, this.model.y, true));
            },
            oncontextmenu: (ev) => {
                ev.preventDefault();
                if (!this.model.opened)
                    GameController.getInstance().then((c) => c.markBlock(this.model.x, this.model.y, this.model.marked));
        }});
        this.parent.appendChild(this.container);
    }
    
    open(openedByPlayer)
    {
        GameController.getInstance().then((controller) => {
            // checking if the game has started
            if (controller.gameState() == 'none')
            {
                controller.startGame({
                    x: this.model.x,
                    y: this.model.y
                });
            }

            // checking if the block has a mine
            if (this.model.hasMine)
            {
                this.container.innerHTML = '💣';
                this.container.classList.add('openedRed');      // change block color
                
                // blinking animation on the opened mine
                if (openedByPlayer)
                {
                    this.container.classList.remove('openedRed');
                    this.container.classList.add('openedMine');
                }

                // game over
                if (controller.gameState() != 'over')
                    controller.gameOver('failure');
            }
            else
            {
                this.container.classList.add('openedGreen');    // change block color
                const numOfMines = controller.countSurroundingMines(this.model.x, this.model.y);

                if (numOfMines != 0)
                    this.container.innerHTML = numOfMines;
            }

            // checking if the game is over
            if (controller.isTheGameOver() && controller.gameState() != 'over')
                controller.gameOver('success');
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