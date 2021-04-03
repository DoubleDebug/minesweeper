export class BlockModel {
    constructor (posX, posY)
    {
        this.opened = false;
        this.x = posX;
        this.y = posY;
    }

    placeMine()
    {
        this.hasMine = true;
    }

    open()
    {
        this.opened = true;
    }
}