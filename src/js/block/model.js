export class BlockModel {
    constructor (hasMine)
    {
        this.hasMine = hasMine;
        this.opened = false;
    }

    open()
    {
        this.opened = true;
    }
}