export class BlockModel {
    constructor (posX, posY) {
        this.opened = false;
        this.marked = false;
        this.x = posX;
        this.y = posY;
    }

    placeMine() {
        this.hasMine = true;
    }

    open() {
        this.opened = true;
    }

    mark() {
        if (this.marked)
            this.marked = false;
        else
            this.marked = true;
    }
}